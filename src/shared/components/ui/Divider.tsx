import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../core/theme/tokens';

export interface DividerProps {
  color?: string;
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

export const Divider: React.FC<DividerProps> = memo(({ color = colors.border, marginVertical = spacing.sm, style }) => (
  <View style={[{ height: 1, backgroundColor: color, marginVertical }, style]} />
));
