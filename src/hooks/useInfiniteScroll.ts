import { useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { PaginatedResponse } from '../types/api.types';

export function useInfiniteScroll<T>(
  queryKey: QueryKey,
  fetcher: (params: { pageParam: number; signal?: AbortSignal }) => Promise<PaginatedResponse<T>>,
  options?: Partial<UseInfiniteQueryOptions<PaginatedResponse<T>, Error>>
) {
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      return fetcher({
        pageParam: Number(pageParam),
        signal: abortControllerRef.current.signal,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
    ...options,
  });

  const loadMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query]);

  const rawPages = (query.data as unknown as { pages?: PaginatedResponse<T>[] })?.pages;
  const items = rawPages ? rawPages.flatMap((page) => page.items) : [];

  return {
    ...query,
    items,
    loadMore,
  };
}
