import { useMemo } from 'react';
import type { Route } from '@/types';

export function useRouteFilter(
  routes: Route[],
  searchQuery: string,
  activeRequirements: string[]
) {
  return useMemo(() => {
    let filtered = routes;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(route =>
        route.origin.toLowerCase().includes(query) ||
        route.destination.toLowerCase().includes(query) ||
        route.type.toLowerCase().includes(query)
      );
    }

    // Filter by requirements (placeholder logic - to be implemented)
    if (activeRequirements.length > 0) {
      // Future: Filter based on route tags matching active requirements
      // For now, return all routes as placeholder
    }

    return filtered;
  }, [routes, searchQuery, activeRequirements]);
}
