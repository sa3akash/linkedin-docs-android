export interface OffsetPageParams {
  page: number;
  limit: number;
}

export interface CursorPageParams {
  cursor?: string;
  limit: number;
  direction?: 'forward' | 'backward';
}

export interface PaginatedResult<T> {
  data: T[];
  nextCursor?: string;
  prevCursor?: string;
  hasMore: boolean;
  total?: number;
}

export class PaginationUtils {
  public static buildOffsetParams(page = 1, limit = 10): OffsetPageParams {
    return { page, limit };
  }

  public static buildCursorParams(cursor?: string, limit = 10, direction: 'forward' | 'backward' = 'forward'): CursorPageParams {
    return { cursor, limit, direction };
  }
}
