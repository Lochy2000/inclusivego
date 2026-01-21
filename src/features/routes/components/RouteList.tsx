import React from 'react';
import { RouteCard } from './RouteCard';
import type { RouteListProps } from '../types/route.types';

export function RouteList({
  routes,
  selectedRouteId,
  onRouteSelect,
  selectedForComparison = [],
  onComparisonToggle,
  comparisonDisabled = false,
}: RouteListProps) {
  const hasRoutes = routes.length > 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-black uppercase tracking-[0.2em]">Verified Routes</h2>
        <span className="bg-slate-100 text-[10px] px-2 py-0.5 font-bold rounded-full">
          {routes.length} FOUND
        </span>
      </div>

      {hasRoutes ? (
        <div className="space-y-4">
          {routes.map(route => (
            <RouteCard
              key={route.id}
              route={route}
              active={selectedRouteId === route.id}
              onClick={() => onRouteSelect(route.id)}
              isSelectedForComparison={selectedForComparison.includes(route.id)}
              onComparisonToggle={onComparisonToggle}
              comparisonDisabled={comparisonDisabled && !selectedForComparison.includes(route.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4">
          <div className="text-gray-400 mb-2">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">No routes found</h3>
          <p className="text-xs text-gray-500">
            Try adjusting your search or accessibility requirements
          </p>
        </div>
      )}
    </div>
  );
}
