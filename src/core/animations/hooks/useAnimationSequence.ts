import { useCallback } from 'react';
import { Animated } from 'react-native';

export const useAnimationSequence = () => {
  const runSequence = useCallback((animations: Animated.CompositeAnimation[], callback?: () => void) => {
    Animated.sequence(animations).start(callback);
  }, []);

  const runParallel = useCallback((animations: Animated.CompositeAnimation[], callback?: () => void) => {
    Animated.parallel(animations).start(callback);
  }, []);

  const runStagger = useCallback(
    (staggerMs: number, animations: Animated.CompositeAnimation[], callback?: () => void) => {
      Animated.stagger(staggerMs, animations).start(callback);
    },
    []
  );

  return { runSequence, runParallel, runStagger };
};
