'use client';

import React, { useState } from 'react';
import { Navigation, Settings, Menu } from 'lucide-react';
import { SettingsModal } from '@/features/settings';
import { APP_NAME } from '@/lib/constants';

export function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <nav className="border-b-4 border-black bg-white sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black flex items-center justify-center rounded-none transform rotate-3">
            <Navigation className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic">{APP_NAME}</h1>
        </div>
        <div className="hidden md:flex items-center gap-8 font-bold uppercase text-sm tracking-widest">
          <a href="#" className="hover:underline decoration-4 underline-offset-8">Explore</a>
          <a href="#" className="hover:underline decoration-4 underline-offset-8">Saved</a>
          <a href="#" className="hover:underline decoration-4 underline-offset-8">Community</a>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
            aria-label="Accessibility Settings"
          >
            <Settings size={20} />
          </button>
          <button className="md:hidden p-2 border-2 border-black">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
