import { useMemo } from 'react';
import type { Route } from '@/types';

// Map requirement IDs to route tag strings
const REQUIREMENT_TAG_MAP: Record<string, string> = {
  wheelchair: 'Wheelchair',
  visual: 'Visual',
  auditory: 'Auditory',
  neuro: 'Neurodivergent',
};

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

    // Filter by requirements (AND logic - route must have ALL selected requirements)
    if (activeRequirements.length > 0) {
      filtered = filtered.filter(route => {
        // Convert requirement IDs to route tag names
        const requiredTags = activeRequirements.map(reqId => REQUIREMENT_TAG_MAP[reqId]);
        
        // Check if route has ALL required tags
        return requiredTags.every(tag => route.tags.includes(tag));
      });
    }

    return filtered;
  }, [routes, searchQuery, activeRequirements]);
}
