'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { FontSize, ContrastMode } from '@/types';
import type { AccessibilityContextValue } from '../types/settings.types';
import { DEFAULT_FONT_SIZE, DEFAULT_CONTRAST_MODE } from '@/lib/constants';

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>(DEFAULT_FONT_SIZE);
  const [contrastMode, setContrastModeState] = useState<ContrastMode>(DEFAULT_CONTRAST_MODE);

  const setFontSize = useCallback((size: FontSize) => {
    setFontSizeState(size);
  }, []);

  const setContrastMode = useCallback((mode: ContrastMode) => {
    setContrastModeState(mode);
  }, []);

  return (
    <AccessibilityContext.Provider value={{ fontSize, contrastMode, setFontSize, setContrastMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
