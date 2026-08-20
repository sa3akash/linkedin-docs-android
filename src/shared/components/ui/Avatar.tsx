import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { colors } from '../../../core/theme/tokens';

export interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  style?: StyleProp<ImageStyle & ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = memo(({ uri, name = 'U', size = 40, style }) => {
  const containerStyle = { width: size, height: size, borderRadius: size / 2 };
  if (uri) {
    return <Image source={{ uri }} style={[containerStyle, style as ImageStyle]} />;
  }
  return (
    <View style={[styles.avatarPlaceholder, containerStyle, style as ViewStyle]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.4 }]}>{name.charAt(0).toUpperCase()}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  avatarPlaceholder: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.textInverse,
    fontWeight: 'bold',
  },
});
