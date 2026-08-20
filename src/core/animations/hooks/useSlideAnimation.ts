import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export const useSlideAnimation = (initialOffset = 100, duration = 300) => {
  const translateY = useRef(new Animated.Value(initialOffset)).current;
  const translateX = useRef(new Animated.Value(initialOffset)).current;

  const slideInY = useCallback(
    (callback?: () => void) => {
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start(callback);
    },
    [translateY, duration]
  );

  const slideOutY = useCallback(
    (callback?: () => void) => {
      Animated.timing(translateY, {
        toValue: initialOffset,
        duration,
        useNativeDriver: true,
      }).start(callback);
    },
    [translateY, initialOffset, duration]
  );

  return { translateY, translateX, slideInY, slideOutY };
};
