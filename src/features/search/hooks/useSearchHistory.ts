import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'inclusiveGO_recentSearches';
const MAX_HISTORY_ITEMS = 5;

interface UseSearchHistoryReturn {
  recentSearches: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  removeFromHistory: (query: string) => void;
}

export function useSearchHistory(): UseSearchHistoryReturn {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on client-side mount only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setRecentSearches(parsed);
          }
        }
      } catch (error) {
        console.error('Error loading search history:', error);
      }
      setIsInitialized(true);
    }
  }, []);

  // Persist to localStorage whenever recentSearches changes (after initialization)
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
      } catch (error) {
        console.error('Error saving search history:', error);
      }
    }
  }, [recentSearches, isInitialized]);

  const addToHistory = useCallback((query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setRecentSearches(prev => {
      // Remove duplicate if exists (case-insensitive deduplication)
      const filtered = prev.filter(
        item => item.toLowerCase() !== trimmedQuery.toLowerCase()
      );
      // Add to beginning and limit to MAX_HISTORY_ITEMS
      return [trimmedQuery, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const removeFromHistory = useCallback((query: string) => {
    setRecentSearches(prev =>
      prev.filter(item => item.toLowerCase() !== query.toLowerCase())
    );
  }, []);

  return {
    recentSearches,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
}
