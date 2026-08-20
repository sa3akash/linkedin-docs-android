import React, { memo } from 'react';
import { Animated, TouchableWithoutFeedback, StyleProp, ViewStyle } from 'react-native';
import { useScaleAnimation } from '../hooks/useScaleAnimation';

export interface AnimatedPressableProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  targetScale?: number;
}

export const AnimatedPressable: React.FC<AnimatedPressableProps> = memo(({
  children,
  onPress,
  style,
  targetScale = 0.95,
}) => {
  const { scale, scaleTo } = useScaleAnimation(1);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => scaleTo(targetScale)}
      onPressOut={() => scaleTo(1)}
      onPress={onPress}
    >
      <Animated.View style={[{ transform: [{ scale }] }, style]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
});
