'use client';

import React from 'react';
import { Navbar } from '@/features/navigation';
import { SearchSidebar } from '@/features/search';
import { MapArea, RouteInfoPanel } from '@/features/routes';
import { Footer } from '@/features/layout';
import { useAccessibility } from '@/features/settings';
import { useRoutes } from '@/features/routes';

export default function HomePage() {
  const { fontSize } = useAccessibility();
  const { selectedRoute } = useRoutes();

  return (
    <div className={`min-h-screen bg-[#FDFCF8] text-slate-900 font-sans selection:bg-yellow-300 ${fontSize}`}>
      <Navbar />

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
        <SearchSidebar />

        <div className="lg:col-span-8 flex flex-col h-full bg-[#E5E5E5]">
          <MapArea />
          {selectedRoute && <RouteInfoPanel route={selectedRoute} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
