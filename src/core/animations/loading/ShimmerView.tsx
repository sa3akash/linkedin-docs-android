import React, { memo, useEffect } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export interface ShimmerViewProps {
  width?: number | string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export const ShimmerView: React.FC<ShimmerViewProps> = memo(({
  width = '100%',
  height = 20,
  style,
}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.8, { duration: 800 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.shimmer, { width, height }, animatedStyle, style]} />;
});

const styles = StyleSheet.create({
  shimmer: {
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
  },
});
