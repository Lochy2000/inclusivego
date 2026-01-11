import React from 'react';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-black text-white p-12 mt-auto border-t-8 border-yellow-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-black uppercase italic mb-6">{APP_NAME}</h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">
            {APP_DESCRIPTION}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm font-black uppercase tracking-widest">
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-yellow-400">Our Mission</a>
            <a href="#" className="hover:text-yellow-400">Verification</a>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-yellow-400">Legal</a>
            <a href="#" className="hover:text-yellow-400">Privacy</a>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-yellow-400">Volunteer</a>
            <a href="#" className="hover:text-yellow-400">Donate</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
