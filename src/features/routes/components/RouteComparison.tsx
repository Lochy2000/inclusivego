'use client';

import React from 'react';
import { Trophy, Clock, MapPin, Star } from 'lucide-react';
import { Modal, Badge } from '@/components/ui';
import type { Route } from '@/types';

interface RouteComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  routes: Route[];
  onClearSelection: () => void;
}

interface MetricRowProps {
  label: string;
  icon: React.ReactNode;
  values: string[];
  bestIndex: number | null;
  lowerIsBetter?: boolean;
}

function parseNumericValue(value: string): number {
  const match = value.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function findBestIndex(values: string[], lowerIsBetter: boolean): number | null {
  if (values.length === 0) return null;

  const numericValues = values.map(parseNumericValue);
  const validIndices = numericValues
    .map((v, i) => ({ value: v, index: i }))
    .filter(item => !isNaN(item.value));

  if (validIndices.length === 0) return null;

  const best = lowerIsBetter
    ? validIndices.reduce((min, curr) => (curr.value < min.value ? curr : min))
    : validIndices.reduce((max, curr) => (curr.value > max.value ? curr : max));

  return best.index;
}

function MetricRow({ label, icon, values, bestIndex }: MetricRowProps) {
  return (
    <div className="border-b-2 border-slate-100 py-3">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}>
        {values.map((value, i) => (
          <div
            key={i}
            className={`text-center py-2 px-3 ${
              bestIndex === i
                ? 'bg-yellow-100 border-2 border-yellow-400 font-black'
                : 'bg-slate-50 border-2 border-transparent'
            }`}
          >
            <span className="text-lg font-bold">{value}</span>
            {bestIndex === i && (
              <Trophy size={14} className="inline-block ml-1 text-yellow-600" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RouteComparison({ isOpen, onClose, routes, onClearSelection }: RouteComparisonProps) {
  if (routes.length < 2) return null;

  const scores = routes.map(r => `${r.score}%`);
  const durations = routes.map(r => r.duration);
  const distances = routes.map(r => r.distance);

  const bestScoreIndex = findBestIndex(scores, false);
  const bestDurationIndex = findBestIndex(durations, true);
  const bestDistanceIndex = findBestIndex(distances, true);

  const allFeatures = [...new Set(routes.flatMap(r => r.features))];

  const handleClose = () => {
    onClose();
  };

  const handleClearAndClose = () => {
    onClearSelection();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="max-h-[80vh] overflow-y-auto -mx-8 -mb-8 px-8 pb-8">
        <h2 className="text-2xl font-black uppercase italic mb-6">Compare Routes</h2>

        <div
          className="grid gap-4 mb-6"
          style={{ gridTemplateColumns: `repeat(${routes.length}, 1fr)` }}
        >
          {routes.map(route => (
            <div key={route.id} className="border-4 border-black p-4 bg-white">
              <div className="flex gap-2 mb-2">
                {route.icons.map((Icon, i) => (
                  <div key={i} className="p-1.5 bg-black text-white rounded-sm">
                    <Icon size={14} />
                  </div>
                ))}
              </div>
              <h3 className="text-sm font-black uppercase leading-tight">
                {route.origin}
              </h3>
              <p className="text-xs text-slate-500 font-medium">to</p>
              <h3 className="text-sm font-black uppercase leading-tight">
                {route.destination}
              </h3>
              <p className="text-xs text-slate-500 mt-2">{route.type}</p>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <MetricRow
            label="Accessibility Score"
            icon={<Star size={16} className="text-yellow-500" />}
            values={scores}
            bestIndex={bestScoreIndex}
          />
          <MetricRow
            label="Duration"
            icon={<Clock size={16} className="text-slate-500" />}
            values={durations}
            bestIndex={bestDurationIndex}
            lowerIsBetter
          />
          <MetricRow
            label="Distance"
            icon={<MapPin size={16} className="text-slate-500" />}
            values={distances}
            bestIndex={bestDistanceIndex}
            lowerIsBetter
          />
        </div>

        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
            Accessibility Features
          </h4>
          <div className="border-2 border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-bold text-xs uppercase">Feature</th>
                  {routes.map(route => (
                    <th key={route.id} className="text-center p-3 font-bold text-xs uppercase">
                      Route {routes.indexOf(route) + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map(feature => (
                  <tr key={feature} className="border-t border-slate-200">
                    <td className="p-3 text-slate-700">{feature}</td>
                    {routes.map(route => (
                      <td key={route.id} className="text-center p-3">
                        {route.features.includes(feature) ? (
                          <span className="inline-block w-5 h-5 bg-green-500 text-white rounded-full text-xs leading-5">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-block w-5 h-5 bg-slate-200 text-slate-400 rounded-full text-xs leading-5">
                            -
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
            Tags
          </h4>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${routes.length}, 1fr)` }}
          >
            {routes.map(route => (
              <div key={route.id} className="flex flex-wrap gap-1">
                {route.tags.map(tag => (
                  <Badge key={tag} colorClass="bg-black text-white px-1.5 py-0 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-3 px-4 bg-yellow-400 border-4 border-black font-black uppercase text-sm hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Done
          </button>
          <button
            onClick={handleClearAndClose}
            className="py-3 px-4 bg-white border-4 border-black font-black uppercase text-sm hover:bg-black hover:text-white transition-all"
          >
            Clear Selection
          </button>
        </div>
      </div>
    </Modal>
  );
}
