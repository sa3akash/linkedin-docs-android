import React, { memo } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export interface BannerProps {
  title: string;
  variant?: 'info' | 'warning' | 'error';
  style?: StyleProp<ViewStyle>;
}

export const Banner: React.FC<BannerProps> = memo(({ title, variant = 'info', style }) => {
  const bg = variant === 'warning' ? '#FFF3CD' : variant === 'error' ? '#F8D7DA' : '#CCE5FF';
  const textColor = variant === 'warning' ? '#856404' : variant === 'error' ? '#721C24' : '#004085';
  return (
    <View style={[styles.banner, { backgroundColor: bg }, style]}>
      <Text style={[styles.bannerText, { color: textColor }]}>{title}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  banner: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 4,
  },
  bannerText: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
});
