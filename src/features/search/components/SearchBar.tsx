import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Where are you going?" }: SearchBarProps) {
  return (
    <div className="mb-8">
      <label className="block text-xs font-black uppercase tracking-[0.2em] mb-3">
        Find Accessible Route
      </label>
      <div className="relative group">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-white border-4 border-black p-4 pl-12 font-bold focus:outline-none focus:ring-0 placeholder:text-slate-400"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={24} />
      </div>
    </div>
  );
}
