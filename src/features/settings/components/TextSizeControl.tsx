import React from 'react';
import { FONT_SIZES } from '@/lib/constants';
import type { FontSize } from '@/types';

interface TextSizeControlProps {
  fontSize: FontSize;
  onChange: (size: FontSize) => void;
}

export function TextSizeControl({ fontSize, onChange }: TextSizeControlProps) {
  return (
    <div>
      <label className="block text-sm font-black uppercase mb-3 tracking-widest">Text Size</label>
      <div className="grid grid-cols-3 gap-2">
        {FONT_SIZES.map(opt => (
          <button
            key={opt.val}
            onClick={() => onChange(opt.val)}
            className={`py-3 border-2 border-black font-bold uppercase transition-all ${
              fontSize === opt.val ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
