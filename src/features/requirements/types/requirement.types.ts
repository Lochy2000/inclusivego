import type { Requirement } from '@/types';

export interface RequirementButtonProps {
  requirement: Requirement;
  isActive: boolean;
  onToggle: (id: string) => void;
}

export interface RequirementGridProps {
  requirements: Requirement[];
  activeRequirements: string[];
  onToggle: (id: string) => void;
}
