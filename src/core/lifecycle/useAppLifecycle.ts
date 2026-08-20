import { useState, useEffect } from 'react';
import { LifecycleManager, AppLifecycleState } from './lifecycleManager';

export const useAppLifecycle = () => {
  const [appState, setAppState] = useState<AppLifecycleState>(() => LifecycleManager.getCurrentState());

  useEffect(() => {
    const unsub = LifecycleManager.subscribe((newState) => {
      setAppState(newState);
    });

    return () => unsub();
  }, []);

  return {
    appState,
    isForeground: appState === 'FOREGROUND',
    isBackground: appState === 'BACKGROUND',
    isInactive: appState === 'INACTIVE',
  };
};
