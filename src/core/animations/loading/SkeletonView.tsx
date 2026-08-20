import React, { memo } from 'react';
import { Animated, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useSkeletonAnimation } from '../hooks/useSkeletonAnimation';

export interface SkeletonViewProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const SkeletonView: React.FC<SkeletonViewProps> = memo(({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const opacity = useSkeletonAnimation(1200);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: width as any,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E1E9EE',
  },
});
