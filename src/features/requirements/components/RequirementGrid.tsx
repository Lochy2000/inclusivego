'use client';

import React from 'react';
import { RequirementButton } from './RequirementButton';
import { useRequirements } from '../context/RequirementContext';
import { mockRequirements } from '../data/mockRequirements';

export function RequirementGrid() {
  const { activeRequirements, toggleRequirement } = useRequirements();

  return (
    <div className="grid grid-cols-2 gap-3">
      {mockRequirements.map((req) => (
        <RequirementButton
          key={req.id}
          requirement={req}
          isActive={activeRequirements.includes(req.id)}
          onToggle={toggleRequirement}
        />
      ))}
    </div>
  );
}
