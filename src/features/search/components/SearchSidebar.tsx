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
  const { searchQuery, updateSearch } = useSearch();
  const { activeRequirements } = useRequirements();
  const { routes, selectedRoute, selectRoute } = useRoutes();

  const filteredRoutes = useRouteFilter(routes, searchQuery, activeRequirements);

  return (
    <aside className="lg:col-span-4 border-r-4 border-black p-6 bg-white overflow-y-auto">
      <SearchBar value={searchQuery} onChange={updateSearch} />

      <div className="mb-10">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4">Your Requirements</h2>
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
