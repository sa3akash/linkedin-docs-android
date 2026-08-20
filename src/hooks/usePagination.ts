import { useState, useCallback } from 'react';

export interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

export const usePagination = (options: UsePaginationOptions = {}) => {
  const { initialPage = 1, pageSize = 10 } = options;
  const [page, setPage] = useState<number>(initialPage);
  const [limit] = useState<number>(pageSize);

  const nextPage = useCallback(() => setPage((prev) => prev + 1), []);
  const prevPage = useCallback(() => setPage((prev) => Math.max(1, prev - 1)), []);
  const resetPagination = useCallback(() => setPage(initialPage), [initialPage]);

  return {
    page,
    limit,
    setPage,
    nextPage,
    prevPage,
    resetPagination,
  };
};
