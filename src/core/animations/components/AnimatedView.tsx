import React, { memo, useEffect } from 'react';
import { ViewProps, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

export interface AnimatedViewProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  preset?: 'fade' | 'slideUp' | 'scale';
  delay?: number;
}

export const AnimatedView: React.FC<AnimatedViewProps> = memo(({ children, style, delay = 0, ...restProps }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
  }, [delay, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle, style]} {...restProps}>
      {children}
    </Animated.View>
  );
});
