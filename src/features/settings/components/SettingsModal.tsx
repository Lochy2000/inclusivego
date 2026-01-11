'use client';

import React from 'react';
import { Modal } from '@/components/ui';
import { TextSizeControl } from './TextSizeControl';
import { ContrastControl } from './ContrastControl';
import { useAccessibility } from '../context/AccessibilityContext';
import type { SettingsModalProps } from '../types/settings.types';

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { fontSize, contrastMode, setFontSize, setContrastMode } = useAccessibility();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Accessibility Settings">
      <div className="space-y-6">
        <TextSizeControl fontSize={fontSize} onChange={setFontSize} />
        <ContrastControl contrastMode={contrastMode} onChange={setContrastMode} />
      </div>

      <button
        onClick={onClose}
        className="w-full mt-8 bg-yellow-400 py-4 border-4 border-black font-black uppercase hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] transition-all"
      >
        Apply Preferences
      </button>
    </Modal>
  );
}
