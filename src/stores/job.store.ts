import { create } from 'zustand';
import { produce } from 'immer';
import { JobListing } from '../types/job.types';

interface JobState {
  jobs: JobListing[];
  savedJobIds: string[];
  appliedJobIds: string[];
  searchQuery: string;
  setJobs: (jobs: JobListing[]) => void;
  setSearchQuery: (query: string) => void;
  toggleSaveJob: (jobId: string) => void;
  markAppliedJob: (jobId: string) => void;
}

export const useJobStore = create<JobState>()((set) => ({
  jobs: [],
  savedJobIds: [],
  appliedJobIds: [],
  searchQuery: '',

  setJobs: (jobs) =>
    set(
      produce((state: JobState) => {
        state.jobs = jobs;
      })
    ),

  setSearchQuery: (query) =>
    set(
      produce((state: JobState) => {
        state.searchQuery = query;
      })
    ),

  toggleSaveJob: (jobId) =>
    set(
      produce((state: JobState) => {
        if (state.savedJobIds.includes(jobId)) {
          state.savedJobIds = state.savedJobIds.filter((id) => id !== jobId);
        } else {
          state.savedJobIds.push(jobId);
        }
      })
    ),

  markAppliedJob: (jobId) =>
    set(
      produce((state: JobState) => {
        if (!state.appliedJobIds.includes(jobId)) {
          state.appliedJobIds.push(jobId);
        }
      })
    ),
}));
