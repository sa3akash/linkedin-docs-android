import { useState, useEffect, useCallback } from 'react';
import { SearchEngine } from './searchEngine';

export interface UseDebouncedSearchProps {
  initialQuery?: string;
  delayMs?: number;
  onSearch?: (query: string) => void;
}

export const useDebouncedSearch = ({
  initialQuery = '',
  delayMs = 400,
  onSearch,
}: UseDebouncedSearchProps = {}) => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [history, setHistory] = useState<string[]>(() => SearchEngine.getHistory());
  const [trending] = useState<string[]>(() => SearchEngine.getTrendingSearches());

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      if (query.trim()) {
        SearchEngine.addHistory(query);
        setHistory(SearchEngine.getHistory());
      }
      if (onSearch) {
        onSearch(query);
      }
    }, delayMs);

    return () => clearTimeout(handler);
  }, [query, delayMs, onSearch]);

  const clearHistory = useCallback(() => {
    SearchEngine.clearHistory();
    setHistory([]);
  }, []);

  return {
    query,
    setQuery,
    debouncedQuery,
    history,
    trending,
    clearHistory,
  };
};
