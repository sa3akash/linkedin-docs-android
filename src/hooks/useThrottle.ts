import { useRef, useCallback } from 'react';

export function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay = 300
): (...args: Parameters<T>) => void {
  const lastRun = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay]
  );
}
