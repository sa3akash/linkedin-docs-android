import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { JobListing } from '../../types/job.types';
import { useTheme } from '../../hooks/useTheme';
import { PrimaryButton } from '../buttons/PrimaryButton';

export interface JobCardProps {
  job: JobListing;
  onPress?: () => void;
  onApply?: () => void;
  onToggleSave?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onPress, onApply, onToggleSave }) => {
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
          borderRadius: radius.md,
          padding: spacing.md,
          marginBottom: spacing.md,
        },
        shadows.sm,
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.logoPlaceholder,
            { backgroundColor: colors.surfaceVariant, borderRadius: radius.sm },
          ]}
        >
          <Text style={[typography.h3, { color: colors.primary }]}>
            {job.companyName.charAt(0)}
          </Text>
        </View>
        <View style={styles.titleMeta}>
          <Text style={[typography.subtitle1, { color: colors.textPrimary }]}>{job.title}</Text>
          <Text style={[typography.body2, { color: colors.textSecondary }]}>{job.companyName}</Text>
          <Text style={[typography.caption, { color: colors.textMuted }]}>
            📍 {job.location} • {job.jobType}
          </Text>
        </View>
        <TouchableOpacity onPress={onToggleSave}>
          <Text style={[typography.h3]}>{job.isSaved ? '🔖' : '📑'}</Text>
        </TouchableOpacity>
      </View>

      {job.salaryRange && (
        <Text style={[typography.caption, { color: colors.success, marginVertical: spacing.xs }]}>
          💰 {job.salaryRange}
        </Text>
      )}

      <View style={styles.footer}>
        <Text style={[typography.overline, { color: colors.textMuted }]}>
          Posted {job.postedDate} • {job.applicantCount} applicants
        </Text>
        {onApply && (
          <PrimaryButton
            title={job.isApplied ? 'Applied' : 'Easy Apply'}
            onPress={onApply}
            disabled={job.isApplied}
            style={{ width: 110, paddingVertical: spacing.xs }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleMeta: {
    flex: 1,
    marginLeft: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
