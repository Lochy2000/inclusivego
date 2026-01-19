'use client';

import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useAutocomplete } from '../hooks/useAutocomplete';
import type { Route } from '@/types';

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  routes: Route[];
  placeholder?: string;
}

export function SearchAutocomplete({
  value,
  onChange,
  routes,
  placeholder = "Where are you going?"
}: SearchAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    suggestions,
    highlightedIndex,
    isOpen,
    setHighlightedIndex,
    closeSuggestions,
    selectSuggestion,
    handleKeyDown
  } = useAutocomplete({ routes, inputValue: value });

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeSuggestions();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSuggestions]);

  // Handle keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const selected = handleKeyDown(e);
    if (selected) {
      onChange(selected);
    }
  };

  // Handle suggestion click
  const onSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    selectSuggestion(suggestion);
    inputRef.current?.focus();
  };

  // Generate unique IDs for accessibility
  const listboxId = 'search-suggestions-listbox';
  const getOptionId = (index: number) => `search-suggestion-${index}`;

  return (
    <div className="mb-8" ref={containerRef}>
      <label
        htmlFor="search-input"
        className="block text-xs font-black uppercase tracking-[0.2em] mb-3"
      >
        Find Accessible Route
      </label>
      <div className="relative group">
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          placeholder={placeholder}
          className="w-full bg-white border-4 border-black p-4 pl-12 font-bold focus:outline-none focus:ring-0 placeholder:text-slate-400"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-activedescendant={highlightedIndex >= 0 ? getOptionId(highlightedIndex) : undefined}
          aria-autocomplete="list"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={24} />

        {/* Suggestions Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            aria-label="Location suggestions"
            className="absolute z-50 w-full mt-1 bg-white border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                id={getOptionId(index)}
                role="option"
                aria-selected={index === highlightedIndex}
                className={`
                  px-4 py-3 cursor-pointer font-bold transition-colors
                  ${index === highlightedIndex
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                  }
                `}
                onClick={() => onSuggestionClick(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
