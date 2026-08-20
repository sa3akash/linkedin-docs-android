import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { JobListing } from '../types/job.types';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { zustandMMKVStorage } from '../services/storage/mmkv.storage';

export interface JobSlice {
  jobs: JobListing[];
  savedJobIds: string[];
  appliedJobIds: string[];
  searchQuery: string;

  setJobs: (jobs: JobListing[]) => void;
  setSearchQuery: (query: string) => void;
  toggleSaveJob: (jobId: string) => void;
  markAppliedJob: (jobId: string) => void;
  clearJobCache: () => void;
}

export const useJobStore = create<JobSlice>()(
  persist(
    (set) => ({
      jobs: [],
      savedJobIds: [],
      appliedJobIds: [],
      searchQuery: '',

      setJobs: (jobs) =>
        set(
          produce((state: JobSlice) => {
            state.jobs = jobs;
          })
        ),

      setSearchQuery: (query) =>
        set(
          produce((state: JobSlice) => {
            state.searchQuery = query;
          })
        ),

      toggleSaveJob: (jobId) =>
        set(
          produce((state: JobSlice) => {
            if (state.savedJobIds.includes(jobId)) {
              state.savedJobIds = state.savedJobIds.filter((id) => id !== jobId);
            } else {
              state.savedJobIds.push(jobId);
            }
          })
        ),

      markAppliedJob: (jobId) =>
        set(
          produce((state: JobSlice) => {
            if (!state.appliedJobIds.includes(jobId)) {
              state.appliedJobIds.push(jobId);
            }
          })
        ),

      clearJobCache: () =>
        set(
          produce((state: JobSlice) => {
            state.jobs = [];
            state.savedJobIds = [];
            state.appliedJobIds = [];
            state.searchQuery = '';
          })
        ),
    }),
    {
      name: STORAGE_KEYS.JOB_STORE,
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
