import { useEffect, useRef, useCallback } from 'react';

export const useMounted = () => {
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const isMounted = useCallback(() => isMountedRef.current, []);

  return { isMounted };
};
