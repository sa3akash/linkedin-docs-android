import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../services/api/axios';
import { ApiResponse, PaginatedResponse } from '../../services/api/types';
import { SearchResultItem } from './searchEngine';

export const useInfiniteSearch = (query: string, limit = 10) => {
  return useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: async ({ pageParam = 1 }) => {
      if (!query.trim()) {
        return { items: [], total: 0, page: 1, limit, hasMore: false };
      }
      const response = await apiClient.get<ApiResponse<PaginatedResponse<SearchResultItem>>>('/search', {
        params: { q: query, page: pageParam, limit },
      });
      return response.data.data;
    },
    enabled: query.trim().length > 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
  });
};
