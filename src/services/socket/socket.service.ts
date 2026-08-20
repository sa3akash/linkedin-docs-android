import { APP_CONFIG } from '../../constants/app.constants';
import { ChatMessage } from '../../types/message.types';

export type SocketEventCallback<T = any> = (data: T) => void;

export interface PresencePayload {
  userId: string;
  status: 'ONLINE' | 'AWAY' | 'OFFLINE';
  lastSeen?: string;
}

export interface TypingPayload {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

class SocketService {
  private ws: WebSocket | null = null;
  private isConnected = false;
  private isManuallyClosed = false;

  // Options
  private url: string = APP_CONFIG.SOCKET_URL;
  private token: string | null = null;

  // Auto Reconnect configuration
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private baseReconnectIntervalMs = 1000;
  private maxReconnectIntervalMs = 30000;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  // Heartbeat configuration
  private heartbeatIntervalMs = 25000;
  private heartbeatTimeoutMs = 10000;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private pongTimeoutTimer: ReturnType<typeof setTimeout> | null = null;

  // Event Listeners Map (Memory leak safe)
  private listeners: Map<string, Set<SocketEventCallback>> = new Map();

  // Connection Recovery Queue
  private pendingQueue: Array<{ event: string; data: any }> = [];

  // Auto-clearing Typing Timers
  private typingTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();

  public connect(url: string = APP_CONFIG.SOCKET_URL, token?: string): void {
    if (this.ws && (this.isConnected || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.url = url;
    if (token) this.token = token;
    this.isManuallyClosed = false;

    const wsUrl = this.token ? `${this.url}?token=${this.token}` : this.url;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log('[SocketService] WebSocket connected successfully');

      // Start Heartbeat ping/pong
      this.startHeartbeat();

      // Flush connection recovery queue
      this.flushPendingQueue();

      // Broadcast initial Online presence
      this.sendPresenceUpdate('ONLINE');

      this.emitToListeners('connect', null);
    };

    this.ws.onmessage = (event: WebSocketMessageEvent) => {
      try {
        const payload = JSON.parse(event.data);

        // Handle Heartbeat Pong response
        if (payload?.event === 'pong') {
          this.handlePong();
          return;
        }

        if (payload && payload.event) {
          this.emitToListeners(payload.event, payload.data);
        }
      } catch (err) {
        console.error('[SocketService] Parsing incoming WS frame failed:', err);
      }
    };

    this.ws.onerror = (error) => {
      console.error('[SocketService] WebSocket error:', error);
      this.emitToListeners('error', error);
    };

    this.ws.onclose = (event) => {
      this.isConnected = false;
      this.stopHeartbeat();
      console.log('[SocketService] WebSocket closed:', event.reason);
      this.emitToListeners('disconnect', event.reason);

      if (!this.isManuallyClosed) {
        this.scheduleReconnect();
      }
    };
  }

  // --- Auto Reconnect with Exponential Backoff ---
  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[SocketService] Max reconnect attempts reached. Connection stopped.');
      return;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    const backoffMs = Math.min(
      this.baseReconnectIntervalMs * Math.pow(2, this.reconnectAttempts),
      this.maxReconnectIntervalMs
    );

    this.reconnectAttempts++;
    console.log(`[SocketService] Reconnecting in ${backoffMs}ms (Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    this.reconnectTimer = setTimeout(() => {
      this.connect(this.url, this.token || undefined);
    }, backoffMs);
  }

  // --- Heartbeat Ping / Pong ---
  private startHeartbeat(): void {
    this.stopHeartbeat();

    this.pingTimer = setInterval(() => {
      if (this.isConnected) {
        this.sendEvent('ping', { timestamp: Date.now() });

        // Set timeout to wait for pong
        this.pongTimeoutTimer = setTimeout(() => {
          console.warn('[SocketService] Heartbeat pong timeout! Force closing socket.');
          this.ws?.close();
        }, this.heartbeatTimeoutMs);
      }
    }, this.heartbeatIntervalMs);
  }

  private handlePong(): void {
    if (this.pongTimeoutTimer) {
      clearTimeout(this.pongTimeoutTimer);
      this.pongTimeoutTimer = null;
    }
  }

  private stopHeartbeat(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
    if (this.pongTimeoutTimer) {
      clearTimeout(this.pongTimeoutTimer);
      this.pongTimeoutTimer = null;
    }
  }

  // --- Connection Recovery & Queueing ---
  public sendEvent(event: string, data: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event, data }));
    } else {
      console.warn(`[SocketService] Queueing event '${event}' while socket is disconnected.`);
      this.pendingQueue.push({ event, data });
    }
  }

  private flushPendingQueue(): void {
    while (this.pendingQueue.length > 0 && this.ws?.readyState === WebSocket.OPEN) {
      const item = this.pendingQueue.shift();
      if (item) {
        this.sendEvent(item.event, item.data);
      }
    }
  }

  // --- Presence Tracking ---
  public sendPresenceUpdate(status: 'ONLINE' | 'AWAY' | 'OFFLINE'): void {
    this.sendEvent('presence_update', { status, lastSeen: new Date().toISOString() });
  }

  public onPresenceUpdate(callback: SocketEventCallback<PresencePayload>): () => void {
    return this.on<PresencePayload>('presence_update', callback);
  }

  // --- Typing Status & Debounce ---
  public sendTypingStatus(conversationId: string, isTyping: boolean): void {
    this.sendEvent('typing_status', { conversationId, isTyping });

    // Auto-stop typing after 3 seconds of inactivity
    const timerKey = `typing_${conversationId}`;
    if (this.typingTimers.has(timerKey)) {
      clearTimeout(this.typingTimers.get(timerKey)!);
    }

    if (isTyping) {
      const timer = setTimeout(() => {
        this.sendEvent('typing_status', { conversationId, isTyping: false });
        this.typingTimers.delete(timerKey);
      }, 3000);
      this.typingTimers.set(timerKey, timer);
    }
  }

  public onTypingStatus(callback: SocketEventCallback<TypingPayload>): () => void {
    return this.on<TypingPayload>('user_typing', callback);
  }

  // --- Chat Messaging ---
  public sendMessage(message: Partial<ChatMessage>): void {
    this.sendEvent('send_message', message);
  }

  public onNewMessage(callback: SocketEventCallback<ChatMessage>): () => void {
    return this.on<ChatMessage>('new_message', callback);
  }

  // --- Event & Listener Cleanup (Memory Leak Prevention) ---
  public on<T>(event: string, callback: SocketEventCallback<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.off(event, callback);
    };
  }

  public off<T>(event: string, callback: SocketEventCallback<T>): void {
    this.removeListener(event, callback);
  }

  public removeListener<T>(event: string, callback: SocketEventCallback<T>): void {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(callback);
      if (set.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  public removeAllListeners(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  private emitToListeners(event: string, data: any): void {
    const set = this.listeners.get(event);
    if (set) {
      set.forEach((cb) => cb(data));
    }
  }

  // --- Disconnect & Complete Cleanup ---
  public disconnect(): void {
    this.isManuallyClosed = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.stopHeartbeat();

    // Clear typing timers
    this.typingTimers.forEach((t) => clearTimeout(t));
    this.typingTimers.clear();

    if (this.ws) {
      this.sendPresenceUpdate('OFFLINE');
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }

  public cleanup(): void {
    this.disconnect();
    this.removeAllListeners();
    this.pendingQueue = [];
  }

  public getIsConnected(): boolean {
    return this.isConnected;
  }
}

export const socketService = new SocketService();
