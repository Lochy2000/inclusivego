import type { FontSize, ContrastMode } from '@/types';

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AccessibilityContextValue {
  fontSize: FontSize;
  contrastMode: ContrastMode;
  setFontSize: (size: FontSize) => void;
  setContrastMode: (mode: ContrastMode) => void;
}
