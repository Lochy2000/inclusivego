'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { DEFAULT_ACTIVE_REQUIREMENTS } from '@/lib/constants';

interface RequirementContextValue {
  activeRequirements: string[];
  toggleRequirement: (id: string) => void;
  setActiveRequirements: (ids: string[]) => void;
}

const RequirementContext = createContext<RequirementContextValue | undefined>(undefined);

export function RequirementProvider({ children }: { children: React.ReactNode }) {
  const [activeRequirements, setActiveRequirements] = useState<string[]>(DEFAULT_ACTIVE_REQUIREMENTS);

  const toggleRequirement = useCallback((id: string) => {
    setActiveRequirements(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  }, []);

  return (
    <RequirementContext.Provider
      value={{ activeRequirements, toggleRequirement, setActiveRequirements }}
    >
      {children}
    </RequirementContext.Provider>
  );
}

export function useRequirements() {
  const context = useContext(RequirementContext);
  if (!context) {
    throw new Error('useRequirements must be used within RequirementProvider');
  }
  return context;
}
