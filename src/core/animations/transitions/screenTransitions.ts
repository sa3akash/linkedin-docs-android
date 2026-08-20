import { Animated, Dimensions } from 'react-native';

export type ScreenTransitionType =
  | 'fade-in'
  | 'fade-out'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'hero-transition';

export interface TransitionAnimationConfig {
  duration?: number;
  useNativeDriver?: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export class ScreenTransitionEngine {
  public static createTransition(
    _type: ScreenTransitionType,
    animatedValue: Animated.Value,
    config: TransitionAnimationConfig = {}
  ): Animated.CompositeAnimation {
    const duration = config.duration ?? 350;
    const useNativeDriver = config.useNativeDriver ?? true;

    animatedValue.setValue(0);

    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      useNativeDriver,
    });
  }

  public static getInterpolatedStyles(type: ScreenTransitionType, animatedValue: Animated.Value) {
    switch (type) {
      case 'fade-in':
        return {
          opacity: animatedValue,
        };
      case 'fade-out':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        };
      case 'slide-left':
        return {
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [SCREEN_WIDTH, 0],
              }),
            },
          ],
        };
      case 'slide-right':
        return {
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-SCREEN_WIDTH, 0],
              }),
            },
          ],
        };
      case 'slide-up':
        return {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [SCREEN_HEIGHT, 0],
              }),
            },
          ],
        };
      case 'slide-down':
        return {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-SCREEN_HEIGHT, 0],
              }),
            },
          ],
        };
      case 'hero-transition':
        return {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 1],
              }),
            },
          ],
        };
      default:
        return {};
    }
  }
}
