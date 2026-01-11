import { useState, useCallback } from 'react';

export function useSearch(initialQuery = '') {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const updateSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    updateSearch,
    clearSearch
  };
}
