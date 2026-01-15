'use client';

import React from 'react';
import { SearchBar } from './SearchBar';
import { RequirementGrid } from '@/features/requirements';
import { RouteList } from '@/features/routes';
import { useSearch } from '../hooks/useSearch';
import { useRequirements } from '@/features/requirements';
import { useRoutes } from '@/features/routes';
import { useRouteFilter } from '@/features/routes/hooks/useRouteFilter';

export function SearchSidebar() {
  const { searchQuery, inputValue, updateSearch } = useSearch();
  const { activeRequirements } = useRequirements();
  const { routes, selectedRoute, selectRoute } = useRoutes();

  const filteredRoutes = useRouteFilter(routes, searchQuery, activeRequirements);
  
  const hasActiveFilters = activeRequirements.length > 0 || searchQuery.trim().length > 0;

  return (
    <aside className="lg:col-span-4 border-r-4 border-black p-6 bg-white overflow-y-auto">
      <SearchBar value={inputValue} onChange={updateSearch} />

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em]">Your Requirements</h2>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 font-bold rounded-full">
              ACTIVE
            </span>
          )}
        </div>
        <RequirementGrid />
      </div>

      <RouteList
        routes={filteredRoutes}
        selectedRouteId={selectedRoute?.id ?? null}
        onRouteSelect={selectRoute}
      />
    </aside>
  );
}
