'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { ThemeButton } from './ThemeButton/ThemeButton';
import { ThemeDropdown } from './ThemeDropdown/ThemeDropdown';
import { THEME_CONFIGS } from '@/types/theme';
import type { Theme } from '@/types/theme';

interface ThemeSelectorViewProps {
  theme: Theme;
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onThemeSelect: (theme: Theme) => void;
}

export function ThemeSelectorView({
  theme,
  showDropdown,
  onToggleDropdown,
  onThemeSelect,
}: ThemeSelectorViewProps) {
  const themeColor = THEME_CONFIGS[theme].color;

  return (
    <>
      <ThemeButton
        themeColor={themeColor}
        onToggle={onToggleDropdown}
      />

      <AnimatePresence>
        {showDropdown && (
          <ThemeDropdown
            currentTheme={theme}
            onThemeSelect={onThemeSelect}
          />
        )}
      </AnimatePresence>
    </>
  );
}

