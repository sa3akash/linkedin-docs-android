import { useEffect, useRef, EffectCallback } from 'react';

function isDeepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useDeepCompareEffect(effect: EffectCallback, dependencies: unknown[]): void {
  const currentDependenciesRef = useRef<unknown[]>(dependencies);

  if (!isDeepEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, currentDependenciesRef.current);
}
