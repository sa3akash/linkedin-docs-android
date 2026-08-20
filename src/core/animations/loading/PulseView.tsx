import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

export interface PulseViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
}

export const PulseView: React.FC<PulseViewProps> = memo(({ children, style, duration = 1000 }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [scale, duration]);

  return <Animated.View style={[{ transform: [{ scale }] }, style]}>{children}</Animated.View>;
});
