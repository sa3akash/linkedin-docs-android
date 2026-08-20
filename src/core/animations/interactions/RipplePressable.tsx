import React, { memo } from 'react';
import { TouchableWithoutFeedback, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export interface RipplePressableProps {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
  rippleColor?: string;
}

export const RipplePressable: React.FC<RipplePressableProps> = memo(({
  children,
  onPress,
  onLongPress,
  style,
  rippleColor = 'rgba(10, 102, 194, 0.2)',
}) => {
  const scale = useSharedValue(1);
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
    rippleScale.value = 0;
    rippleOpacity.value = 1;
    rippleScale.value = withTiming(1, { duration: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    rippleOpacity.value = withTiming(0, { duration: 200 });
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedRippleStyle = useAnimatedStyle(() => ({
    backgroundColor: rippleColor,
    opacity: rippleOpacity.value,
    transform: [{ scale: rippleScale.value }],
  }));

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Animated.View style={[styles.container, animatedContainerStyle, style]}>
        <Animated.View style={[styles.ripple, animatedRippleStyle]} />
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  ripple: {
    ...StyleSheet.absoluteFill,
    borderRadius: 9999,
  },
});
