import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { FullscreenLoader } from '../../../components';
import { profileApi } from '../api/profile.api';
import { UserProfile } from '../../../types';

export interface ProfileScreenProps {
  userId?: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ userId }) => {
  const { colors, spacing, radius, typography, shadows } = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileApi.getUserProfile(userId).then((res) => {
      setProfile(res);
      setLoading(false);
    });
  }, [userId]);

  if (loading || !profile) return <FullscreenLoader message="Loading profile..." />;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Banner & Avatar */}
      <View style={styles.bannerContainer}>
        {profile.bannerUrl ? (
          <Image source={{ uri: profile.bannerUrl }} style={styles.banner} />
        ) : (
          <View style={[styles.banner, { backgroundColor: colors.primary }]} />
        )}
        {profile.avatarUrl ? (
          <Image
            source={{ uri: profile.avatarUrl }}
            style={[
              styles.avatar,
              {
                borderColor: colors.surface,
                borderRadius: radius.round,
              },
            ]}
          />
        ) : null}
      </View>

      {/* Main Info Card */}
      <View
        style={[
          styles.card,
          styles.mainCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            padding: spacing.lg,
            marginHorizontal: spacing.md,
            borderRadius: radius.lg,
          },
          shadows.sm,
        ]}
      >
        <Text style={[typography.h1, { color: colors.textPrimary }]}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={[typography.subtitle1, { color: colors.textSecondary, marginVertical: spacing.xs }]}>
          {profile.headline}
        </Text>
        <Text style={[typography.caption, { color: colors.textMuted }]}>
          📍 {profile.location} • {profile.connectionCount} connections
        </Text>
      </View>

      {/* About Section */}
      {profile.about && (
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              padding: spacing.lg,
              marginTop: spacing.md,
              marginHorizontal: spacing.md,
              borderRadius: radius.lg,
            },
            shadows.sm,
          ]}
        >
          <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.xs }]}>
            About
          </Text>
          <Text style={[typography.body1, { color: colors.textSecondary }]}>{profile.about}</Text>
        </View>
      )}

      {/* Experience Section */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            padding: spacing.lg,
            marginTop: spacing.md,
            marginHorizontal: spacing.md,
            borderRadius: radius.lg,
          },
          shadows.sm,
        ]}
      >
        <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.sm }]}>
          Experience
        </Text>
        {profile.experiences.map((exp) => (
          <View key={exp.id} style={{ marginBottom: spacing.md }}>
            <Text style={[typography.subtitle1, { color: colors.textPrimary }]}>{exp.title}</Text>
            <Text style={[typography.body2, { color: colors.primary }]}>{exp.companyName}</Text>
            <Text style={[typography.caption, { color: colors.textMuted }]}>{exp.startDate} - Present</Text>
            {exp.description && (
              <Text style={[typography.body2, styles.expDescText, { color: colors.textSecondary }]}>
                {exp.description}
              </Text>
            )}
          </View>
        ))}
      </View>

      {/* Skills Section */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            padding: spacing.lg,
            marginTop: spacing.md,
            marginBottom: spacing.xxl,
            marginHorizontal: spacing.md,
            borderRadius: radius.lg,
          },
          shadows.sm,
        ]}
      >
        <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.sm }]}>
          Skills
        </Text>
        {profile.skills.map((skill) => (
          <View key={skill.id} style={styles.skillRow}>
            <Text style={[typography.subtitle2, { color: colors.textPrimary }]}>{skill.name}</Text>
            <Text style={[typography.caption, { color: colors.textMuted }]}>
              {skill.endorsementsCount} endorsements
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    position: 'relative',
  },
  banner: {
    width: '100%',
    height: 140,
  },
  avatar: {
    width: 88,
    height: 88,
    borderWidth: 3,
    position: 'absolute',
    bottom: -44,
    left: 20,
  },
  card: {
    borderWidth: 1,
  },
  mainCard: {
    marginTop: 40,
  },
  expDescText: {
    marginTop: 4,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
});
