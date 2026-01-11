import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border-4 border-black w-full max-w-md p-8 relative shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 border-2 border-black"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        {title && (
          <h2 className="text-3xl font-black uppercase italic mb-6">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
