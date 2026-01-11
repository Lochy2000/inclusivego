'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Route } from '@/types';
import { mockRoutes } from '../data/mockRoutes';

interface RouteContextValue {
  routes: Route[];
  selectedRoute: Route | null;
  selectRoute: (routeId: number) => void;
  setRoutes: (routes: Route[]) => void;
}

const RouteContext = createContext<RouteContextValue | undefined>(undefined);

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(mockRoutes[0]);

  const selectRoute = useCallback((routeId: number) => {
    const route = routes.find(r => r.id === routeId);
    if (route) {
      setSelectedRoute(route);
    }
  }, [routes]);

  return (
    <RouteContext.Provider value={{ routes, selectedRoute, selectRoute, setRoutes }}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRoutes() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoutes must be used within RouteProvider');
  }
  return context;
}
