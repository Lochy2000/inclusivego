import React from 'react';

// Route Types
export interface Route {
  id: number;
  origin: string;
  destination: string;
  duration: string;
  distance: string;
  type: 'Public Transit' | 'Walking/Rolling' | 'Shuttle' | string;
  icons: Array<React.ComponentType<{ size?: number }>>;
  score: number;
  features: string[];
  tags: string[];
  status: string;
  description: string;
}

// Requirement Types
export interface Requirement {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

// Accessibility Settings Types
export type FontSize = 'text-base' | 'text-lg' | 'text-xl';
export type ContrastMode = 'normal' | 'high';

export interface AccessibilitySettings {
  fontSize: FontSize;
  contrastMode: ContrastMode;
}

// Search Types
export interface SearchQuery {
  query: string;
  activeRequirements: string[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface RoutesResponse {
  routes: Route[];
  count: number;
}
