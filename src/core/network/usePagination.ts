import { useState, useCallback } from 'react';
import { OffsetPageParams, CursorPageParams, PaginatedResult } from './pagination';

export const useOffsetPagination = (initialLimit = 10) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const reset = useCallback(() => setPage(1), []);

  return {
    params: { page, limit } as OffsetPageParams,
    page,
    limit,
    nextPage,
    prevPage,
    reset,
  };
};

export const useCursorPagination = (initialLimit = 10) => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [limit] = useState(initialLimit);

  const setNextCursor = useCallback((next?: string) => {
    setCursor(next);
  }, []);

  return {
    params: { cursor, limit } as CursorPageParams,
    cursor,
    limit,
    setNextCursor,
  };
};

export const useBidirectionalPagination = <T>(initialLimit = 10) => {
  const [items, setItems] = useState<T[]>([]);
  const [forwardCursor, setForwardCursor] = useState<string | undefined>(undefined);
  const [backwardCursor, setBackwardCursor] = useState<string | undefined>(undefined);

  const appendItems = useCallback((result: PaginatedResult<T>) => {
    setItems((prev) => [...prev, ...result.data]);
    setForwardCursor(result.nextCursor);
  }, []);

  const prependItems = useCallback((result: PaginatedResult<T>) => {
    setItems((prev) => [...result.data, ...prev]);
    setBackwardCursor(result.prevCursor);
  }, []);

  return {
    items,
    forwardCursor,
    backwardCursor,
    limit: initialLimit,
    appendItems,
    prependItems,
  };
};
