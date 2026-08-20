import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ShimmerView } from './ShimmerView';

export interface WaveViewProps {
  barCount?: number;
  style?: StyleProp<ViewStyle>;
}

export const WaveView: React.FC<WaveViewProps> = memo(({ barCount = 4, style }) => (
  <View style={[styles.container, style]}>
    {Array.from({ length: barCount }).map((_, index) => (
      <ShimmerView key={index} width={40 + index * 20} height={12} style={styles.bar} />
    ))}
  </View>
));

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  bar: {
    marginVertical: 4,
  },
});
