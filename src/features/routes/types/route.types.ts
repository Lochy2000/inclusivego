import type { Route } from '@/types';

export interface RouteCardProps {
  route: Route;
  active: boolean;
  onClick: () => void;
}

export interface RouteListProps {
  routes: Route[];
  selectedRouteId: number | null;
  onRouteSelect: (routeId: number) => void;
}

export interface RouteFilterOptions {
  requirements: string[];
  searchQuery: string;
}
