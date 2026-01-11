import React from 'react';
import { MapPin, ChevronRight, Clock } from 'lucide-react';
import type { Route } from '@/types';

interface RouteInfoPanelProps {
  route: Route;
}

export function RouteInfoPanel({ route }: RouteInfoPanelProps) {
  return (
    <div className="h-1/3 lg:h-80 bg-white border-t-4 border-black p-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">
              {route.destination}
            </h2>
            <div className="bg-yellow-400 text-black px-3 py-1 text-sm font-black border-2 border-black">
              LIVE
            </div>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <MapPin size={14} /> Starting from {route.origin}
          </p>
        </div>

        <button className="w-full md:w-auto bg-black text-white px-10 py-5 font-black uppercase italic text-xl flex items-center justify-center gap-4 hover:bg-slate-800 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
          Start Route <ChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border-l-4 border-slate-100 pl-6">
          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">
            Key Features
          </h4>
          <ul className="space-y-1">
            {route.features.map((f, i) => (
              <li key={i} className="text-sm font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-l-4 border-slate-100 pl-6">
          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">
            Current Status
          </h4>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${route.status === 'Clear' ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-xl font-black uppercase">{route.status}</span>
          </div>
          <p className="text-sm text-slate-500 mt-1 font-medium">{route.description}</p>
        </div>

        <div className="border-l-4 border-slate-100 pl-6">
          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">
            Estimated Arrival
          </h4>
          <div className="flex items-center gap-3">
            <Clock className="text-slate-400" />
            <span className="text-xl font-black">{route.duration}</span>
          </div>
          <p className="text-sm text-slate-500 mt-1 font-medium">Arrival by 14:45 PM</p>
        </div>
      </div>
    </div>
  );
}
