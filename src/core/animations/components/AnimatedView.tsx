import React, { memo, useEffect } from 'react';
import { Animated, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { useFadeAnimation } from '../hooks/useFadeAnimation';

export interface AnimatedViewProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  preset?: 'fade' | 'slideUp' | 'scale';
  delay?: number;
}

export const AnimatedView: React.FC<AnimatedViewProps> = memo(({ children, style, delay = 0, ...restProps }) => {
  const { opacity, fadeIn } = useFadeAnimation(0, 300);

  useEffect(() => {
    const timer = setTimeout(() => {
      fadeIn();
    }, delay);
    return () => clearTimeout(timer);
  }, [fadeIn, delay]);

  return (
    <Animated.View style={[{ opacity }, style]} {...restProps}>
      {children}
    </Animated.View>
  );
});
