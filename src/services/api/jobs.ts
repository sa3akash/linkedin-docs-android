import { apiClient } from './axios';
import { ApiResponse, PaginatedResponse } from './types';

export interface JobItem {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'REMOTE';
  description: string;
  postedAt: string;
  isSaved?: boolean;
}

export interface JobSearchFilters {
  query?: string;
  location?: string;
  employmentType?: string;
  remoteOnly?: boolean;
}

export const jobsApi = {
  searchJobs: async (
    filters: JobSearchFilters,
    page = 1,
    limit = 10
  ): Promise<ApiResponse<PaginatedResponse<JobItem>>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<JobItem>>>('/jobs', {
      params: { ...filters, page, limit },
    });
    return response.data;
  },

  getJobDetails: async (jobId: string): Promise<ApiResponse<JobItem>> => {
    const response = await apiClient.get<ApiResponse<JobItem>>(`/jobs/${jobId}`);
    return response.data;
  },

  applyForJob: async (jobId: string, resumeUrl: string): Promise<ApiResponse<{ applied: boolean }>> => {
    const response = await apiClient.post<ApiResponse<{ applied: boolean }>>(`/jobs/${jobId}/apply`, {
      resumeUrl,
    });
    return response.data;
  },

  toggleSaveJob: async (jobId: string): Promise<ApiResponse<{ saved: boolean }>> => {
    const response = await apiClient.post<ApiResponse<{ saved: boolean }>>(`/jobs/${jobId}/save`);
    return response.data;
  },
};
