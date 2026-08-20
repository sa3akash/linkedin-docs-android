import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export const useScaleAnimation = (initialScale = 1) => {
  const scale = useRef(new Animated.Value(initialScale)).current;

  const scaleTo = useCallback(
    (toValue: number, callback?: () => void) => {
      Animated.spring(scale, {
        toValue,
        useNativeDriver: true,
        friction: 5,
        tension: 40,
      }).start(callback);
    },
    [scale]
  );

  const pressIn = useCallback(() => {
    scaleTo(0.95);
  }, [scaleTo]);

  const pressOut = useCallback(() => {
    scaleTo(1);
  }, [scaleTo]);

  return { scale, scaleTo, pressIn, pressOut };
};
