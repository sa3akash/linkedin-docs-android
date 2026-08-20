import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { UserProfile } from '../../types/user.types';
import { useStyles } from '../../hooks/useStyles';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { Theme } from '../../theme';

export interface ProfileCardProps {
  user: UserProfile;
  onPress?: () => void;
  onConnect?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onPress, onConnect }) => {
  const { styles, theme } = useStyles(createStyles);
  const { typography } = theme;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.card}>
      <View style={styles.header}>
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={[typography.h3, styles.placeholderText]}>
              {user.firstName.charAt(0)}
            </Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={[typography.subtitle1, styles.nameText]}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={[typography.caption, styles.headlineText]} numberOfLines={2}>
            {user.headline}
          </Text>
          <Text style={[typography.overline, styles.connectionsText]}>
            {user.connectionCount} connections
          </Text>
        </View>
      </View>
      {onConnect ? (
        <PrimaryButton title="Connect" onPress={onConnect} style={styles.connectBtn} />
      ) : null}
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) => ({
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.round,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  placeholderText: {
    color: theme.colors.textInverse,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  nameText: {
    color: theme.colors.textPrimary,
  },
  headlineText: {
    color: theme.colors.textSecondary,
  },
  connectionsText: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xxs,
  },
  connectBtn: {
    marginTop: theme.spacing.md,
  },
});
