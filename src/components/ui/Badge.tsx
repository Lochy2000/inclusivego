import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  colorClass?: string;
  className?: string;
}

export function Badge({ children, colorClass = "bg-slate-100 text-slate-700", className = "" }: BadgeProps) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${colorClass} ${className}`}>
      {children}
    </span>
  );
}
