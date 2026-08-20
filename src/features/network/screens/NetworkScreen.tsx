import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { ProfileCard, FullscreenLoader } from '../../../components';
import { networkApi } from '../api/network.api';
import { UserProfile } from '../../../types';

export const NetworkScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors, spacing, typography } = useTheme();
  const [recommendations, setRecommendations] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    networkApi.getRecommendations().then((res) => {
      setRecommendations(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <FullscreenLoader message="Loading recommendations..." />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.md }]}>
      <Text style={[typography.h2, { color: colors.textPrimary, marginBottom: spacing.md }]}>
        {t('network.recommendations')}
      </Text>

      <FlatList<UserProfile>
        data={recommendations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProfileCard
            user={item}
            onConnect={() => {
              // Trigger connection request
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
