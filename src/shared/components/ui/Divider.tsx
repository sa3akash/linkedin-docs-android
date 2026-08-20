import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../core/theme/tokens';

export interface DividerProps {
  color?: string;
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

export const Divider: React.FC<DividerProps> = memo(({ color = colors.border, marginVertical = spacing.sm, style }) => (
  <View style={[styles.divider, { backgroundColor: color, marginVertical }, style]} />
));

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
});
