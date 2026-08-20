import { AppState, AppStateStatus } from 'react-native';
import { socketService } from '../../services/socket/socket.service';

export type AppLifecycleState = 'FOREGROUND' | 'BACKGROUND' | 'INACTIVE';
export type LifecycleEventCallback = (state: AppLifecycleState) => void;

export class LifecycleManager {
  private static currentState: AppLifecycleState = 'FOREGROUND';
  private static listeners: Set<LifecycleEventCallback> = new Set();
  private static backgroundTimestamp: number | null = null;
  private static sessionTimeoutMs = 1000 * 60 * 60 * 24; // 24 hours session expiry

  public static initialize(onSessionExpired?: () => void): () => void {
    const subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      const mappedState: AppLifecycleState =
        nextState === 'active' ? 'FOREGROUND' : nextState === 'background' ? 'BACKGROUND' : 'INACTIVE';

      const previousState = LifecycleManager.currentState;
      LifecycleManager.currentState = mappedState;

      console.log(`[LifecycleManager] Transition: ${previousState} -> ${mappedState}`);

      if (mappedState === 'BACKGROUND') {
        LifecycleManager.backgroundTimestamp = Date.now();
      }

      if (mappedState === 'FOREGROUND') {
        // 1. Check Session Expiry
        if (LifecycleManager.backgroundTimestamp) {
          const elapsedMs = Date.now() - LifecycleManager.backgroundTimestamp;
          if (elapsedMs > LifecycleManager.sessionTimeoutMs) {
            console.warn('[LifecycleManager] Session expired due to inactivity threshold!');
            if (onSessionExpired) {
              onSessionExpired();
            }
          }
        }

        // 2. Trigger Auto Reconnect for WebSocket & background tasks
        console.log('[LifecycleManager] Foreground active -> Triggering auto-reconnect');
        if (!socketService.getIsConnected()) {
          socketService.connect();
        }
      }

      LifecycleManager.listeners.forEach((listener) => listener(mappedState));
    });

    return () => subscription.remove();
  }

  public static getCurrentState(): AppLifecycleState {
    return LifecycleManager.currentState;
  }

  public static isForeground(): boolean {
    return LifecycleManager.currentState === 'FOREGROUND';
  }

  public static subscribe(listener: LifecycleEventCallback): () => void {
    LifecycleManager.listeners.add(listener);
    return () => {
      LifecycleManager.listeners.delete(listener);
    };
  }
}
