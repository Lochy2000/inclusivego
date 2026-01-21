'use client';

import { useState, useCallback, useMemo } from 'react';
import type { Route } from '@/types';

const MAX_COMPARISON_ROUTES = 3;

export function useRouteComparison(routes: Route[]) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleComparison = useCallback((routeId: number) => {
    setSelectedIds(prev => {
      if (prev.includes(routeId)) {
        return prev.filter(id => id !== routeId);
      }
      if (prev.length >= MAX_COMPARISON_ROUTES) {
        return prev;
      }
      return [...prev, routeId];
    });
  }, []);

  const clearComparison = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const comparisonRoutes = useMemo(() => {
    return selectedIds
      .map(id => routes.find(r => r.id === id))
      .filter((r): r is Route => r !== undefined);
  }, [selectedIds, routes]);

  const canCompare = selectedIds.length >= 2;
  const isAtLimit = selectedIds.length >= MAX_COMPARISON_ROUTES;

  const isSelectedForComparison = useCallback(
    (routeId: number) => selectedIds.includes(routeId),
    [selectedIds]
  );

  return {
    selectedIds,
    comparisonRoutes,
    canCompare,
    isAtLimit,
    toggleComparison,
    clearComparison,
    isSelectedForComparison,
  };
}
