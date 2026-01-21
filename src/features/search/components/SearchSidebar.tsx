'use client';

import React, { useState } from 'react';
import { GitCompare } from 'lucide-react';
import { SearchAutocomplete } from './SearchAutocomplete';
import { RequirementGrid } from '@/features/requirements';
import { RouteList, RouteSortDropdown, RouteComparison } from '@/features/routes';
import { useSearch } from '../hooks/useSearch';
import { useRequirements } from '@/features/requirements';
import { useRoutes } from '@/features/routes';
import { useRouteFilter } from '@/features/routes/hooks/useRouteFilter';
import { useRouteSort } from '@/features/routes/hooks/useRouteSort';
import { useRouteComparison } from '@/features/routes/hooks/useRouteComparison';

export function SearchSidebar() {
  const { searchQuery, inputValue, updateSearch } = useSearch();
  const { activeRequirements } = useRequirements();
  const { routes, selectedRoute, selectRoute } = useRoutes();

  const filteredRoutes = useRouteFilter(routes, searchQuery, activeRequirements);
  const {
    sortedRoutes,
    sortField,
    sortDirection,
    setSortField,
    toggleDirection,
  } = useRouteSort(filteredRoutes);

  const {
    selectedIds,
    comparisonRoutes,
    canCompare,
    isAtLimit,
    toggleComparison,
    clearComparison,
  } = useRouteComparison(sortedRoutes);

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const hasActiveFilters = activeRequirements.length > 0 || searchQuery.trim().length > 0;
  const hasRoutes = filteredRoutes.length > 0;

  return (
    <aside className="lg:col-span-4 border-r-4 border-black p-6 bg-white overflow-y-auto">
      <SearchAutocomplete value={inputValue} onChange={updateSearch} routes={routes} />

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

      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1">
          <RouteSortDropdown
            sortField={sortField}
            sortDirection={sortDirection}
            onFieldChange={setSortField}
            onDirectionToggle={toggleDirection}
            disabled={!hasRoutes}
          />
        </div>
        {canCompare && (
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-2 py-2 px-4 bg-yellow-400 border-4 border-black font-black uppercase text-xs hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <GitCompare size={16} />
            Compare ({selectedIds.length})
          </button>
        )}
      </div>

      <RouteList
        routes={sortedRoutes}
        selectedRouteId={selectedRoute?.id ?? null}
        onRouteSelect={selectRoute}
        selectedForComparison={selectedIds}
        onComparisonToggle={toggleComparison}
        comparisonDisabled={isAtLimit}
      />

      <RouteComparison
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        routes={comparisonRoutes}
        onClearSelection={clearComparison}
      />
    </aside>
  );
}
