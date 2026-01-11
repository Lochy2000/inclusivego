import React from 'react';
import { Navigation, Star, ShieldCheck } from 'lucide-react';

export function MapArea() {
  return (
    <div className="flex-1 relative overflow-hidden bg-slate-200">
      {/* Visual placeholder for Map */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Map UI Elements */}
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <button className="bg-white p-3 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Navigation size={20} />
        </button>
        <button className="bg-white p-3 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Star size={20} />
        </button>
      </div>

      <div className="absolute bottom-6 right-6">
        <div className="bg-white border-4 border-black p-2 flex flex-col gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <button className="p-2 hover:bg-slate-100 border-b-2 border-black">+</button>
          <button className="p-2 hover:bg-slate-100">-</button>
        </div>
      </div>

      {/* Path Visualization Placeholder */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M 100 400 Q 250 350 400 400 T 700 300"
          stroke="black"
          strokeWidth="8"
          fill="none"
          strokeDasharray="16 16"
          className="animate-pulse"
        />
        <circle cx="100" cy="400" r="10" fill="white" stroke="black" strokeWidth="4" />
        <circle cx="700" cy="300" r="12" fill="yellow" stroke="black" strokeWidth="4" />
      </svg>

      {/* Floating Banner */}
      <div className="absolute top-6 right-6 bg-black text-white p-4 max-w-xs border-2 border-white">
        <div className="flex gap-3">
          <ShieldCheck className="text-green-400 shrink-0" />
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-1">
              Accessibility Verified
            </p>
            <p className="text-[11px] opacity-80 leading-relaxed font-medium">
              This path was verified by our community as step-free on Oct 12, 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
