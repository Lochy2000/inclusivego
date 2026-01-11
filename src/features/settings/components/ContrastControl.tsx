import React from 'react';
import type { ContrastMode } from '@/types';

interface ContrastControlProps {
  contrastMode: ContrastMode;
  onChange: (mode: ContrastMode) => void;
}

export function ContrastControl({ contrastMode, onChange }: ContrastControlProps) {
  return (
    <div>
      <label className="block text-sm font-black uppercase mb-3 tracking-widest">Contrast Mode</label>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onChange('normal')}
          className={`py-3 border-2 border-black font-bold uppercase ${
            contrastMode === 'normal' ? 'bg-black text-white' : 'bg-white text-black border-dashed'
          }`}
        >
          Ink (Normal)
        </button>
        <button
          onClick={() => onChange('high')}
          className={`py-3 border-2 border-black font-bold uppercase ${
            contrastMode === 'high' ? 'bg-black text-white' : 'bg-white text-black border-dashed'
          }`}
        >
          High Contrast
        </button>
      </div>
    </div>
  );
}
