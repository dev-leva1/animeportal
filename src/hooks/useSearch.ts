import { useState, useMemo, useCallback } from 'react';

interface UseSearchProps<T> {
  items: T[];
  searchFields: (keyof T)[];
  initialQuery?: string;
  caseSensitive?: boolean;
}

interface UseSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  filteredItems: T[];
  clearSearch: () => void;
  hasResults: boolean;
  resultCount: number;
}

export const useSearch = <T extends Record<string, any>>({
  items,
  searchFields,
  initialQuery = '',
  caseSensitive = false
}: UseSearchProps<T>): UseSearchReturn<T> => {
  const [query, setQuery] = useState(initialQuery);

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    const searchTerm = caseSensitive ? query : query.toLowerCase();

    return items.filter((item) => {
      return searchFields.some((field) => {
        const fieldValue = item[field];
        if (fieldValue == null) return false;
        
        const stringValue = String(fieldValue);
        const searchValue = caseSensitive ? stringValue : stringValue.toLowerCase();
        
        return searchValue.includes(searchTerm);
      });
    });
  }, [items, query, searchFields, caseSensitive]);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  const hasResults = filteredItems.length > 0;
  const resultCount = filteredItems.length;

  return {
    query,
    setQuery,
    filteredItems,
    clearSearch,
    hasResults,
    resultCount
  };
};

export default useSearch; 