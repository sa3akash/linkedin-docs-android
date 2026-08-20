import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle, StyleSheet, View } from 'react-native';

export interface ShimmerViewProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const ShimmerView: React.FC<ShimmerViewProps> = memo(({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const translateX = useRef(new Animated.Value(-150)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: 150,
        duration: 1200,
        useNativeDriver: true,
      })
    );

    animation.start();
    return () => animation.stop();
  }, [translateX]);

  return (
    <View style={[styles.container, { width: width as any, height, borderRadius }, style]}>
      <Animated.View style={[styles.shimmer, { transform: [{ translateX }] }]} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1E9EE',
    overflow: 'hidden',
    position: 'relative',
  },
  shimmer: {
    width: 60,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});
