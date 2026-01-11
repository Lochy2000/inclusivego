import React from 'react';
import { RouteCard } from './RouteCard';
import type { RouteListProps } from '../types/route.types';

export function RouteList({ routes, selectedRouteId, onRouteSelect }: RouteListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-black uppercase tracking-[0.2em]">Verified Routes</h2>
        <span className="bg-slate-100 text-[10px] px-2 py-0.5 font-bold rounded-full">
          {routes.length} FOUND
        </span>
      </div>

      <div className="space-y-4">
        {routes.map(route => (
          <RouteCard
            key={route.id}
            route={route}
            active={selectedRouteId === route.id}
            onClick={() => onRouteSelect(route.id)}
          />
        ))}
      </div>
    </div>
  );
}
