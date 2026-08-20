import React, { memo } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, radius } from '../../../core/theme/tokens';

export interface BadgeProps {
  count?: number;
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Badge: React.FC<BadgeProps> = memo(({ count, dot = false, style }) => {
  if (dot) {
    return <View style={[styles.badgeDot, style]} />;
  }
  if (count === undefined || count <= 0) return null;
  return (
    <View style={[styles.badgeContainer, style]}>
      <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  badgeContainer: {
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
