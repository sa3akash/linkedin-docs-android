import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { JobListing } from '../../types/job.types';
import { useStyles } from '../../hooks/useStyles';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { Theme } from '../../theme';

export interface JobCardProps {
  job: JobListing;
  onPress?: () => void;
  onApply?: () => void;
  onToggleSave?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onPress, onApply, onToggleSave }) => {
  const { styles, theme } = useStyles(createStyles);
  const { typography } = theme;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}>
          <Text style={[typography.h3, styles.logoText]}>
            {job.companyName.charAt(0)}
          </Text>
        </View>
        <View style={styles.titleMeta}>
          <Text style={[typography.subtitle1, styles.titleText]}>{job.title}</Text>
          <Text style={[typography.body2, styles.companyText]}>{job.companyName}</Text>
          <Text style={[typography.caption, styles.metaText]}>
            📍 {job.location} • {job.jobType}
          </Text>
        </View>
        <TouchableOpacity onPress={onToggleSave}>
          <Text style={typography.h3}>{job.isSaved ? '🔖' : '📑'}</Text>
        </TouchableOpacity>
      </View>

      {job.salaryRange ? (
        <Text style={[typography.caption, styles.salaryText]}>
          💰 {job.salaryRange}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <Text style={[typography.overline, styles.postedText]}>
          Posted {job.postedDate} • {job.applicantCount} applicants
        </Text>
        {onApply ? (
          <PrimaryButton
            title={job.isApplied ? 'Applied' : 'Easy Apply'}
            onPress={onApply}
            disabled={job.isApplied}
            style={styles.applyBtn}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) => ({
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.radius.sm,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  logoText: {
    color: theme.colors.primary,
  },
  titleMeta: {
    flex: 1,
    marginLeft: 12,
  },
  titleText: {
    color: theme.colors.textPrimary,
  },
  companyText: {
    color: theme.colors.textSecondary,
  },
  metaText: {
    color: theme.colors.textMuted,
  },
  salaryText: {
    color: theme.colors.success,
    marginVertical: theme.spacing.xs,
  },
  footer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginTop: 12,
  },
  postedText: {
    color: theme.colors.textMuted,
  },
  applyBtn: {
    width: 110,
    paddingVertical: theme.spacing.xs,
  },
});
