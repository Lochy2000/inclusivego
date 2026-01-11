import React from 'react';
import type { RequirementButtonProps } from '../types/requirement.types';

export function RequirementButton({ requirement, isActive, onToggle }: RequirementButtonProps) {
  const Icon = requirement.icon;

  return (
    <button
      onClick={() => onToggle(requirement.id)}
      className={`flex flex-col items-center justify-center p-4 border-2 transition-all gap-2 ${
        isActive
          ? 'border-black bg-black text-white'
          : 'border-slate-200 bg-slate-50 text-slate-500 grayscale hover:grayscale-0'
      }`}
    >
      <Icon size={24} />
      <span className="text-[10px] font-black uppercase text-center">{requirement.label}</span>
    </button>
  );
}
