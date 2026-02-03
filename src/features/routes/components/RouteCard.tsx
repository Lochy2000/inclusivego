import React from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui';
import type { RouteCardProps } from '../types/route.types';

export function RouteCard({
  route,
  active,
  onClick,
  isSelectedForComparison = false,
  onComparisonToggle,
  comparisonDisabled = false,
}: RouteCardProps) {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onComparisonToggle && !comparisonDisabled) {
      onComparisonToggle(route.id);
    }
  };

  const showCheckbox = onComparisonToggle !== undefined;

  return (
    <div
      onClick={onClick}
      className={`group relative p-5 cursor-pointer border-4 transition-all duration-200 mb-4 ${
        active ? 'border-black bg-yellow-50 translate-x-1' : 'border-slate-200 bg-white hover:border-slate-400'
      }`}
    >
      {showCheckbox && (
        <button
          onClick={handleCheckboxClick}
          disabled={comparisonDisabled && !isSelectedForComparison}
          aria-label={isSelectedForComparison ? 'Remove from comparison' : 'Add to comparison'}
          className={`absolute top-3 left-3 w-6 h-6 border-2 flex items-center justify-center transition-all duration-200 ${
            isSelectedForComparison
              ? 'bg-black border-black text-white'
              : comparisonDisabled
                ? 'border-slate-200 bg-slate-100 cursor-not-allowed opacity-0 group-hover:opacity-50'
                : 'border-slate-300 bg-white opacity-0 group-hover:opacity-100 hover:border-black'
          }`}
        >
          {isSelectedForComparison && <Check size={14} strokeWidth={3} />}
        </button>
      )}

      <div className="flex justify-between items-start mb-3">
        <div className={`flex gap-2 ${showCheckbox ? 'ml-8' : ''}`}>
          {route.icons.map((Icon, i) => (
            <div key={i} className="p-1.5 bg-black text-white rounded-sm">
              <Icon size={16} />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black">{route.score}%</span>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter leading-none">
            Access Score
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-black leading-tight uppercase tracking-tight">
          {route.origin} → {route.destination}
        </h3>
        <p className="text-sm text-slate-600 font-medium">
          {route.duration} • {route.distance} • {route.type}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {route.tags.map(tag => (
          <Badge key={tag} colorClass="bg-black text-white px-1.5 py-0">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
