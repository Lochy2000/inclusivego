'use client';

import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import type { SortField, SortDirection } from '../hooks/useRouteSort';

interface RouteSortDropdownProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onFieldChange: (field: SortField) => void;
  onDirectionToggle: () => void;
  disabled?: boolean;
}

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'score', label: 'Score' },
  { value: 'duration', label: 'Duration' },
  { value: 'distance', label: 'Distance' },
];

export function RouteSortDropdown({
  sortField,
  sortDirection,
  onFieldChange,
  onDirectionToggle,
  disabled = false,
}: RouteSortDropdownProps) {
  const directionLabel = sortDirection === 'asc' ? 'Low to High' : 'High to Low';
  const DirectionIcon = sortDirection === 'asc' ? ArrowUp : ArrowDown;

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="route-sort" className="text-xs font-bold text-gray-600">
        Sort by:
      </label>
      <select
        id="route-sort"
        value={sortField}
        onChange={(e) => onFieldChange(e.target.value as SortField)}
        disabled={disabled}
        className="text-xs font-bold border-2 border-black rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onDirectionToggle}
        disabled={disabled}
        aria-label={`Sort direction: ${directionLabel}. Click to toggle.`}
        title={directionLabel}
        className="flex items-center gap-1 text-xs font-bold border-2 border-black rounded px-2 py-1 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <DirectionIcon size={14} />
        <span className="hidden sm:inline">{sortDirection === 'asc' ? 'Asc' : 'Desc'}</span>
      </button>
    </div>
  );
}
