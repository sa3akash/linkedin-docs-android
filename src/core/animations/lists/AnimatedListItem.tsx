import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { ListAnimationEngine, ListAnimationType } from './listAnimations';

export interface AnimatedListItemProps {
  children: React.ReactNode;
  index?: number;
  type?: ListAnimationType;
  staggerDelay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  onAnimationComplete?: () => void;
}

export const AnimatedListItem: React.FC<AnimatedListItemProps> = memo(({
  children,
  index = 0,
  type = 'stagger',
  staggerDelay = 50,
  duration = 300,
  style,
  onAnimationComplete,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = ListAnimationEngine.animateItem(type, animatedValue, {
      index,
      staggerDelay,
      duration,
    });

    animation.start(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });
  }, [type, index, staggerDelay, duration, animatedValue, onAnimationComplete]);

  const animatedStyles = ListAnimationEngine.getListItemStyles(type, animatedValue);

  return <Animated.View style={[styles.container, animatedStyles, style]}>{children}</Animated.View>;
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
