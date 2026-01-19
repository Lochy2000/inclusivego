import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { Route } from '@/types';

interface UseAutocompleteOptions {
  routes: Route[];
  inputValue: string;
  minChars?: number;
}

interface UseAutocompleteReturn {
  suggestions: string[];
  highlightedIndex: number;
  isOpen: boolean;
  setHighlightedIndex: (index: number) => void;
  closeSuggestions: () => void;
  selectSuggestion: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => string | null;
}

export function useAutocomplete({
  routes,
  inputValue,
  minChars = 1
}: UseAutocompleteOptions): UseAutocompleteReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  // Track the last selected value to prevent reopening after selection
  const lastSelectedValue = useRef<string | null>(null);

  // Extract unique locations from routes (origins + destinations)
  const allLocations = useMemo(() => {
    const locations = new Set<string>();
    routes.forEach(route => {
      locations.add(route.origin);
      locations.add(route.destination);
    });
    return Array.from(locations).sort();
  }, [routes]);

  // Filter suggestions based on input (case-insensitive)
  const suggestions = useMemo(() => {
    if (inputValue.length < minChars) return [];
    const query = inputValue.toLowerCase();
    return allLocations.filter(loc =>
      loc.toLowerCase().includes(query)
    );
  }, [allLocations, inputValue, minChars]);

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  // Auto-open when there are suggestions, close when none
  // But don't reopen if the current input matches the last selected value
  useEffect(() => {
    if (suggestions.length > 0 && inputValue.length >= minChars) {
      // Don't reopen if user just selected this value
      if (lastSelectedValue.current === inputValue) {
        return;
      }
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [suggestions, inputValue, minChars]);

  // Clear the last selected value when user starts typing something different
  useEffect(() => {
    if (lastSelectedValue.current && inputValue !== lastSelectedValue.current) {
      lastSelectedValue.current = null;
    }
  }, [inputValue]);

  const closeSuggestions = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const selectSuggestion = useCallback((value: string) => {
    lastSelectedValue.current = value;
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent): string | null => {
    if (!isOpen || suggestions.length === 0) return null;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        return null;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        return null;

      case 'Enter':
        if (highlightedIndex >= 0) {
          e.preventDefault();
          const selected = suggestions[highlightedIndex];
          lastSelectedValue.current = selected;
          setIsOpen(false);
          setHighlightedIndex(-1);
          return selected;
        }
        return null;

      case 'Escape':
        e.preventDefault();
        closeSuggestions();
        return null;

      default:
        return null;
    }
  }, [isOpen, suggestions, highlightedIndex, closeSuggestions]);

  return {
    suggestions,
    highlightedIndex,
    isOpen,
    setHighlightedIndex,
    closeSuggestions,
    selectSuggestion,
    handleKeyDown
  };
}
