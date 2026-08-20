import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { colors, radius, spacing } from '../../../core/theme/tokens';

// --- 1. Avatar Component ---
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

// --- 2. Badge Component ---
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

// --- 3. Chip / Tag Component ---
export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Chip: React.FC<ChipProps> = memo(({ label, selected = false, onPress, style }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected, style]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
});

// --- 4. Divider Component ---
export interface DividerProps {
  color?: string;
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

export const Divider: React.FC<DividerProps> = memo(({ color = colors.border, marginVertical = spacing.sm, style }) => (
  <View style={[{ height: 1, backgroundColor: color, marginVertical }, style]} />
));

// --- 5. Empty State Component ---
export interface EmptyStateProps {
  title: string;
  description?: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const EmptyState: React.FC<EmptyStateProps> = memo(({ title, description, actionTitle, onAction, style }) => (
  <View style={[styles.centerContainer, style]}>
    <Text style={styles.emptyTitle}>{title}</Text>
    {description && <Text style={styles.emptyDescription}>{description}</Text>}
    {actionTitle && onAction && (
      <TouchableOpacity style={styles.actionBtn} onPress={onAction}>
        <Text style={styles.actionBtnText}>{actionTitle}</Text>
      </TouchableOpacity>
    )}
  </View>
));

// --- 6. Error State Component ---
export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = memo(({ message = 'Something went wrong', onRetry }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorText}>{message}</Text>
    {onRetry && (
      <TouchableOpacity style={styles.actionBtn} onPress={onRetry}>
        <Text style={styles.actionBtnText}>Retry</Text>
      </TouchableOpacity>
    )}
  </View>
));

// --- 7. Infinite Loader Component ---
export const InfiniteLoader: React.FC = memo(() => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="small" color={colors.primary} />
  </View>
));

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
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  chipTextSelected: {
    color: colors.textInverse,
    fontWeight: '600',
  },
  centerContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  actionBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  actionBtnText: {
    color: colors.textInverse,
    fontWeight: '600',
  },
  loaderContainer: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
});
