import React, { memo, useEffect } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export interface SkeletonViewProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const SkeletonView: React.FC<SkeletonViewProps> = memo(({
  width = '100%',
  height = 16,
  borderRadius = 4,
  style,
}) => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.9, { duration: 750 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.skeleton, { width, height, borderRadius }, animatedStyle, style]} />;
});

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E1E9EE',
    marginVertical: 4,
  },
});
