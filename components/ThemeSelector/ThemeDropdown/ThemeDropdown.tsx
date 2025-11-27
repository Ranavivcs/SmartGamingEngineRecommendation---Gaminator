'use client';

import { ThemeDropdownView } from './ThemeDropdownView';
import type { Theme } from '@/types/theme';

interface ThemeDropdownProps {
  currentTheme: Theme;
  onThemeSelect: (theme: Theme) => void;
}

export function ThemeDropdown({
  currentTheme,
  onThemeSelect,
}: ThemeDropdownProps) {
  return (
    <ThemeDropdownView
      currentTheme={currentTheme}
      onThemeSelect={onThemeSelect}
    />
  );
}

