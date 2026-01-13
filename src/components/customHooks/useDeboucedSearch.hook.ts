import { useCallback, useEffect, useState } from 'react';

export interface UseDebouncedSearchOptions {
  initialValue?: string;
  delay?: number;
}

interface UseDebouncedSearchResult {
  search: string;
  debouncedSearch: string;
  onSearchChange: (value: string) => void;
  reset: () => void;
}

export default function useDebouncedSearch(
  options: UseDebouncedSearchOptions = {},
): UseDebouncedSearchResult {
  const { initialValue = '', delay = 300 } = options;

  const [search, setSearch] = useState(initialValue);
  const debouncedSearch = useDebouncedValue(search, delay);

  const onSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const reset = useCallback(() => {
    setSearch(initialValue);
  }, [initialValue]);

  return {
    search,
    debouncedSearch,
    onSearchChange,
    reset,
  };
}

function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
