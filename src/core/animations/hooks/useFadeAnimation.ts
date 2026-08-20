import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export const useFadeAnimation = (initialValue = 0, duration = 300) => {
  const opacity = useRef(new Animated.Value(initialValue)).current;

  const fadeIn = useCallback(
    (callback?: () => void) => {
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start(callback);
    },
    [opacity, duration]
  );

  const fadeOut = useCallback(
    (callback?: () => void) => {
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start(callback);
    },
    [opacity, duration]
  );

  return { opacity, fadeIn, fadeOut };
};
