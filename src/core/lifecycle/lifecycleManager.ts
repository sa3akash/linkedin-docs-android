import { AppState, AppStateStatus } from 'react-native';

export type AppLifecycleListener = (state: AppStateStatus) => void;

export class LifecycleManager {
  private static currentState: AppStateStatus = (AppState.currentState as AppStateStatus) || 'active';
  private static listeners: Set<AppLifecycleListener> = new Set();

  public static initialize(): () => void {
    const subscription = AppState.addEventListener('change', (nextState) => {
      console.log(`[LifecycleManager] State changed from ${LifecycleManager.currentState} -> ${nextState}`);
      LifecycleManager.currentState = nextState;
      LifecycleManager.listeners.forEach((listener) => listener(nextState));
    });

    return () => subscription.remove();
  }

  public static getCurrentState(): AppStateStatus {
    return LifecycleManager.currentState;
  }

  public static isForeground(): boolean {
    return LifecycleManager.currentState === 'active';
  }

  public static subscribe(listener: AppLifecycleListener): () => void {
    LifecycleManager.listeners.add(listener);
    return () => {
      LifecycleManager.listeners.delete(listener);
    };
  }
}
