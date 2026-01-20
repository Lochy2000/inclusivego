'use client';

import React from 'react';
import { Clock, X, Trash2 } from 'lucide-react';

interface SearchHistoryProps {
  recentSearches: string[];
  onSelectSearch: (query: string) => void;
  onRemoveSearch: (query: string) => void;
  onClearHistory: () => void;
  isVisible: boolean;
}

export function SearchHistory({
  recentSearches,
  onSelectSearch,
  onRemoveSearch,
  onClearHistory,
  isVisible,
}: SearchHistoryProps) {
  if (!isVisible || recentSearches.length === 0) {
    return null;
  }

  return (
    <div
      className="absolute z-40 w-full mt-1 bg-white border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
      role="region"
      aria-label="Recent searches"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b-2 border-black bg-gray-50">
        <span className="text-xs font-black uppercase tracking-[0.15em] text-gray-600">
          Recent Searches
        </span>
        <button
          type="button"
          onClick={onClearHistory}
          className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
          aria-label="Clear all recent searches"
        >
          <Trash2 size={14} />
          <span>Clear</span>
        </button>
      </div>

      {/* History List */}
      <ul role="list" aria-label="Recent search history">
        {recentSearches.map((search, index) => (
          <li
            key={`${search}-${index}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
          >
            <button
              type="button"
              onClick={() => onSelectSearch(search)}
              className="flex items-center gap-3 flex-1 text-left focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
              aria-label={`Search for ${search}`}
            >
              <Clock size={16} className="text-gray-400 flex-shrink-0" />
              <span className="font-bold text-black truncate">{search}</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveSearch(search);
              }}
              className="ml-2 p-1 text-gray-400 hover:text-black hover:bg-gray-200 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-black"
              aria-label={`Remove ${search} from history`}
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
