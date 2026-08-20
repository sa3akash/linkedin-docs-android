import React, { memo, useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export interface ScreenTransitionViewProps {
  children: React.ReactNode;
  type?: 'fade' | 'slideLeft' | 'slideRight' | 'slideUp';
  style?: StyleProp<ViewStyle>;
}

export const ScreenTransitionView: React.FC<ScreenTransitionViewProps> = memo(({
  children,
  type = 'fade',
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(type === 'slideLeft' ? 100 : type === 'slideRight' ? -100 : 0);
  const translateY = useSharedValue(type === 'slideUp' ? 50 : 0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 350 });
    translateX.value = withTiming(0, { duration: 350 });
    translateY.value = withTiming(0, { duration: 350 });
  }, [opacity, translateX, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
});
