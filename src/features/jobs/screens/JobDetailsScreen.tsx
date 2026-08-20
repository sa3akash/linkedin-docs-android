import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { useJobStore } from '../../../stores/job.store';
import { PrimaryButton } from '../../../components';
import { jobApi } from '../api/job.api';

export interface JobDetailsScreenProps {
  jobId: string;
}

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ jobId }) => {
  const { colors, spacing, typography } = useTheme();
  const { jobs, markAppliedJob } = useJobStore();
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[typography.body1, { color: colors.textSecondary }]}>Job details unavailable</Text>
      </View>
    );
  }

  const handleApply = () => {
    jobApi.applyForJob(jobId);
    markAppliedJob(jobId);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <Text style={[typography.h1, { color: colors.textPrimary }]}>{job.title}</Text>
      <Text style={[typography.subtitle1, { color: colors.primary, marginVertical: spacing.xs }]}>
        {job.companyName}
      </Text>
      <Text style={[typography.caption, { color: colors.textMuted, marginBottom: spacing.md }]}>
        📍 {job.location} • {job.jobType}
      </Text>

      {job.salaryRange && (
        <Text style={[typography.subtitle2, { color: colors.success, marginBottom: spacing.lg }]}>
          💰 Estimated Salary: {job.salaryRange}
        </Text>
      )}

      <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.xs }]}>
        About the Role
      </Text>
      <Text style={[typography.body1, { color: colors.textSecondary, marginBottom: spacing.lg }]}>
        {job.description}
      </Text>

      <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.xs }]}>
        Requirements
      </Text>
      {job.requirements.map((req, idx) => (
        <Text key={idx} style={[typography.body2, { color: colors.textPrimary, marginVertical: 2 }]}>
          • {req}
        </Text>
      ))}

      <PrimaryButton
        title={job.isApplied ? 'Applied' : 'Easy Apply Now'}
        onPress={handleApply}
        disabled={job.isApplied}
        style={{ marginTop: spacing.xxl }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
