import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { FullscreenLoader } from '../../../components';
import { notificationsApi } from '../api/notifications.api';
import { AppNotification } from '../../../types';

export const NotificationsScreen: React.FC = () => {
  const { colors, spacing, radius, typography } = useTheme();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationsApi.getNotifications().then((res) => {
      setNotifications(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <FullscreenLoader message="Loading notifications..." />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList<AppNotification>
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor: item.isRead ? colors.surface : colors.surfaceVariant,
                borderColor: colors.border,
                padding: spacing.md,
              },
            ]}
          >
            {item.avatarUrl ? (
              <Image source={{ uri: item.avatarUrl }} style={[styles.avatar, { borderRadius: radius.round }]} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary }]}>
                <Text style={[typography.subtitle2, { color: colors.textInverse }]}>🔔</Text>
              </View>
            )}
            <View style={styles.meta}>
              <Text style={[typography.subtitle2, { color: colors.textPrimary }]}>
                {item.title}
              </Text>
              <Text style={[typography.body2, { color: colors.textSecondary }]} numberOfLines={2}>
                {item.body}
              </Text>
              <Text style={[typography.overline, styles.createdAtText, { color: colors.textMuted }]}>
                {item.createdAt}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    flex: 1,
    marginLeft: 12,
  },
  createdAtText: {
    marginTop: 2,
  },
});
