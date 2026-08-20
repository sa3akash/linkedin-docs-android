import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { ScreenTransitionEngine, ScreenTransitionType } from './screenTransitions';

export interface ScreenTransitionViewProps {
  children: React.ReactNode;
  type?: ScreenTransitionType;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  onTransitionEnd?: () => void;
}

export const ScreenTransitionView: React.FC<ScreenTransitionViewProps> = memo(({
  children,
  type = 'slide-left',
  duration = 350,
  style,
  onTransitionEnd,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = ScreenTransitionEngine.createTransition(type, animatedValue, { duration });
    animation.start(() => {
      if (onTransitionEnd) {
        onTransitionEnd();
      }
    });
  }, [type, duration, animatedValue, onTransitionEnd]);

  const animatedStyles = ScreenTransitionEngine.getInterpolatedStyles(type, animatedValue);

  return <Animated.View style={[styles.container, animatedStyles, style]}>{children}</Animated.View>;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
