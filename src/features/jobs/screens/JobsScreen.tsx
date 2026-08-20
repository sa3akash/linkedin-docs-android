import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { useJobStore } from '../../../stores/job.store';
import { SearchInput, JobCard, FullscreenLoader } from '../../../components';
import { jobApi } from '../api/job.api';
import { JobListing } from '../../../types';

export interface JobsScreenProps {
  onNavigateToJobDetails: (jobId: string) => void;
}

export const JobsScreen: React.FC<JobsScreenProps> = ({ onNavigateToJobDetails }) => {
  const { colors, spacing } = useTheme();
  const { jobs, setJobs, toggleSaveJob, markAppliedJob } = useJobStore();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobApi.getJobs(search).then((res) => {
      setJobs(res.items);
      setLoading(false);
    });
  }, [search, setJobs]);

  if (loading) return <FullscreenLoader message="Searching jobs..." />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.md }]}>
      <SearchInput
        placeholder="Search jobs by title or company"
        value={search}
        onChangeText={setSearch}
        containerStyle={{ marginBottom: spacing.md }}
      />

      <FlatList<JobListing>
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => onNavigateToJobDetails(item.id)}
            onApply={() => {
              jobApi.applyForJob(item.id);
              markAppliedJob(item.id);
            }}
            onToggleSave={() => toggleSaveJob(item.id)}
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
