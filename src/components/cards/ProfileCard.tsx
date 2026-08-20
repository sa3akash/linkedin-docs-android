import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { UserProfile } from '../../types/user.types';
import { useTheme } from '../../hooks/useTheme';
import { PrimaryButton } from '../buttons/PrimaryButton';

export interface ProfileCardProps {
  user: UserProfile;
  onPress?: () => void;
  onConnect?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onPress, onConnect }) => {
  const { colors, spacing, radius, typography, shadows } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.lg,
          padding: spacing.lg,
          marginBottom: spacing.md,
        },
        shadows.sm,
      ]}
    >
      <View style={styles.header}>
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={[styles.avatar, { borderRadius: radius.round }]} />
        ) : (
          <View
            style={[
              styles.avatarPlaceholder,
              { backgroundColor: colors.primaryLight, borderRadius: radius.round },
            ]}
          >
            <Text style={[typography.h3, { color: colors.textInverse }]}>
              {user.firstName.charAt(0)}
            </Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={[typography.subtitle1, { color: colors.textPrimary }]}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]} numberOfLines={2}>
            {user.headline}
          </Text>
          <Text style={[typography.overline, { color: colors.textMuted, marginTop: spacing.xxs }]}>
            {user.connectionCount} connections
          </Text>
        </View>
      </View>
      {onConnect && (
        <PrimaryButton
          title="Connect"
          onPress={onConnect}
          style={{ marginTop: spacing.md }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
});
