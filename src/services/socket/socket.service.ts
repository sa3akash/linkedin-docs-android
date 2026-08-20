import { io, Socket } from 'socket.io-client';
import { APP_CONFIG } from '../../constants/app.constants';
import { ChatMessage } from '../../types/message.types';

export type SocketEventCallback<T> = (data: T) => void;

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  public connect(token: string): void {
    if (this.socket && this.isConnected) return;

    this.socket = io(APP_CONFIG.SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('[SocketService] Connected successfully');
    });

    this.socket.on('disconnect', (reason) => {
      this.isConnected = false;
      console.log('[SocketService] Disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('[SocketService] Connection error:', error);
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  public sendTypingStatus(conversationId: string, isTyping: boolean): void {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing_status', { conversationId, isTyping });
    }
  }

  public sendMessage(message: Partial<ChatMessage>): void {
    if (this.socket && this.isConnected) {
      this.socket.emit('send_message', message);
    }
  }

  public onNewMessage(callback: SocketEventCallback<ChatMessage>): () => void {
    if (!this.socket) return () => {};
    this.socket.on('new_message', callback);
    return () => {
      this.socket?.off('new_message', callback);
    };
  }

  public onTypingStatus(
    callback: SocketEventCallback<{ conversationId: string; userId: string; isTyping: boolean }>
  ): () => void {
    if (!this.socket) return () => {};
    this.socket.on('user_typing', callback);
    return () => {
      this.socket?.off('user_typing', callback);
    };
  }

  public getIsConnected(): boolean {
    return this.isConnected;
  }
}

export const socketService = new SocketService();
