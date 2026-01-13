import { useCallback, useState } from 'react';

export interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
}

export interface UsePaginationResult {
  page: number;
  limit: number;

  setPage: (page: number) => void;
  setLimit: (limit: number) => void;

  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
}

export default function usePagination(options: UsePaginationOptions = {}): UsePaginationResult {
  const { initialPage = 1, initialLimit = 20 } = options;

  const [page, setPageState] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);

  const setPage = useCallback((p: number) => {
    setPageState(Math.max(1, p));
  }, []);

  const setLimit = useCallback((l: number) => {
    setLimitState(Math.max(1, l));
    setPageState(1); // RESET PAGE ON LIMIT CHANGE (IMPORTANT)
  }, []);

  const nextPage = useCallback(() => {
    setPageState((p) => p + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPageState((p) => Math.max(1, p - 1));
  }, []);

  const reset = useCallback(() => {
    setPageState(initialPage);
    setLimitState(initialLimit);
  }, [initialPage, initialLimit]);

  return {
    page,
    limit,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    reset,
  };
}
