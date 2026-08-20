declare module 'react-native-reanimated' {
  import { ComponentType } from 'react';
  import { ViewProps, TextProps, ImageProps, StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

  export interface AnimatedStyle {
    [key: string]: any;
  }

  export interface SharedValue<T> {
    value: T;
  }

  export function useSharedValue<T>(initialValue: T): SharedValue<T>;
  export function useAnimatedStyle<T extends AnimatedStyle>(updater: () => T): T;

  export function withTiming<T>(toValue: T, userConfig?: { duration?: number }): T;
  export function withSpring<T>(toValue: T, userConfig?: { damping?: number; stiffness?: number; friction?: number }): T;
  export function withSequence<T>(...animations: T[]): T;
  export function withRepeat<T>(animation: T, numberOfReps?: number, reverse?: boolean): T;
  export function withDelay<T>(delayMs: number, animation: T): T;
  export function runOnJS<F extends (...args: any[]) => any>(fn: F): F;

  const Animated: {
    View: ComponentType<ViewProps & { style?: StyleProp<ViewStyle> }>;
    Text: ComponentType<TextProps & { style?: StyleProp<TextStyle> }>;
    Image: ComponentType<ImageProps & { style?: StyleProp<ImageStyle> }>;
    createAnimatedComponent: <P>(component: ComponentType<P>) => ComponentType<P>;
  };

  export default Animated;
}
