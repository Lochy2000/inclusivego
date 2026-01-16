'use client';

import { useMemo, useState, useCallback } from 'react';
import type { Route } from '@/types';

export type SortField = 'score' | 'duration' | 'distance';
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}

// Parse "18 mins" → 18
const parseDuration = (duration: string): number => {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

// Parse "1.2 km" → 1.2
const parseDistance = (distance: string): number => {
  const match = distance.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
};

export function useRouteSort(routes: Route[]) {
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const toggleDirection = useCallback(() => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const updateSortField = useCallback((field: SortField) => {
    setSortField(field);
    // Set sensible defaults when changing field
    if (field === 'score') {
      setSortDirection('desc'); // High to low
    } else {
      setSortDirection('asc'); // Shortest first
    }
  }, []);

  const sortedRoutes = useMemo(() => {
    if (routes.length === 0) return routes;

    return [...routes].sort((a, b) => { // ...routes creates a new array to avoid mutating the original array, sort into 
      let comparison = 0;

      switch (sortField) {
        case 'score':
          comparison = a.score - b.score;
          break;
        case 'duration':
          comparison = parseDuration(a.duration) - parseDuration(b.duration);
          break;
        case 'distance':
          comparison = parseDistance(a.distance) - parseDistance(b.distance);
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [routes, sortField, sortDirection]);

  return {
    sortedRoutes,
    sortField,
    sortDirection,
    setSortField: updateSortField,
    toggleDirection,
  };
}
