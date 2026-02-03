import type { Route } from '@/types';

export interface RouteCardProps {
  route: Route;
  active: boolean;
  onClick: () => void;
  isSelectedForComparison?: boolean;
  onComparisonToggle?: (routeId: number) => void;
  comparisonDisabled?: boolean;
}

export interface RouteListProps {
  routes: Route[];
  selectedRouteId: number | null;
  onRouteSelect: (routeId: number) => void;
  selectedForComparison?: number[];
  onComparisonToggle?: (routeId: number) => void;
  comparisonDisabled?: boolean;
}

export interface RouteFilterOptions {
  requirements: string[];
  searchQuery: string;
}
