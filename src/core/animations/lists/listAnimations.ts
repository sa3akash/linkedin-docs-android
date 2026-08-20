import { Animated } from 'react-native';

export type ListAnimationType =
  | 'stagger'
  | 'enter'
  | 'exit'
  | 'insert'
  | 'delete'
  | 'reorder';

export interface ListAnimationConfig {
  index?: number;
  staggerDelay?: number;
  duration?: number;
}

export class ListAnimationEngine {
  public static animateItem(
    type: ListAnimationType,
    animatedValue: Animated.Value,
    config: ListAnimationConfig = {}
  ): Animated.CompositeAnimation {
    const { index = 0, staggerDelay = 50, duration = 300 } = config;
    const delay = type === 'stagger' ? index * staggerDelay : 0;

    animatedValue.setValue(type === 'exit' || type === 'delete' ? 1 : 0);
    const toValue = type === 'exit' || type === 'delete' ? 0 : 1;

    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    });
  }

  public static getListItemStyles(type: ListAnimationType, animatedValue: Animated.Value) {
    if (type === 'delete' || type === 'exit') {
      return {
        opacity: animatedValue,
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          },
        ],
      };
    }

    if (type === 'insert') {
      return {
        opacity: animatedValue,
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1],
            }),
          },
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      };
    }

    // Default Enter / Stagger
    return {
      opacity: animatedValue,
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
    };
  }
}
