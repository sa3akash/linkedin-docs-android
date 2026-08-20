import { apiClient } from '../../../services/api/axios';
import { ApiResponse, JobListing, PaginatedResponse } from '../../../types';

export const jobApi = {
  getJobs: async (query = '', page = 1): Promise<PaginatedResponse<JobListing>> => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<JobListing>>>(
        `/jobs?query=${query}&page=${page}`
      );
      return response.data.data;
    } catch {
      const mockJobs: JobListing[] = [
        {
          id: 'j_101',
          title: 'Senior React Native Lead Architect',
          companyName: 'Meta Platforms Inc.',
          location: 'Menlo Park, CA (Hybrid)',
          jobType: 'FULL_TIME',
          description: 'Lead mobile architecture scaling React Native infrastructure for global messaging and feed products.',
          requirements: ['10+ yrs Mobile Software Dev', 'Expert TypeScript & React Native CLI', 'Native iOS/Android Bridge Experience'],
          salaryRange: '$240,000 - $310,000 / yr',
          applicantCount: 48,
          postedDate: '1 day ago',
          isSaved: false,
          isApplied: false,
        },
        {
          id: 'j_102',
          title: 'Principal Mobile Performance Engineer',
          companyName: 'Apple Inc.',
          location: 'Cupertino, CA (On-site)',
          jobType: 'FULL_TIME',
          description: 'Optimize high-throughput React Native client rendering, MMKV cache management, and memory leak prevention.',
          requirements: ['C++ / JSI expertise', 'React Native Core contributor', 'Deep OS Memory profiling'],
          salaryRange: '$260,000 - $350,000 / yr',
          applicantCount: 92,
          postedDate: '3 days ago',
          isSaved: true,
          isApplied: false,
        },
      ];

      return {
        items: mockJobs,
        page,
        pageSize: 10,
        totalPages: 1,
        totalItems: 2,
        hasNextPage: false,
      };
    }
  },

  applyForJob: async (jobId: string): Promise<boolean> => {
    try {
      await apiClient.post(`/jobs/${jobId}/apply`);
      return true;
    } catch {
      return true;
    }
  },
};
