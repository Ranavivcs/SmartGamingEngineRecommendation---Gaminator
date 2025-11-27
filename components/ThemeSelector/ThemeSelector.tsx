'use client';

import { useState } from 'react';
import { ThemeSelectorView } from './ThemeSelectorView';
import type { Theme } from '@/types/theme';

interface ThemeSelectorProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ theme, onThemeChange }: ThemeSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleThemeSelect = (selectedTheme: Theme) => {
    onThemeChange(selectedTheme);
    setShowDropdown(false);
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <ThemeSelectorView
      theme={theme}
      showDropdown={showDropdown}
      onToggleDropdown={handleToggleDropdown}
      onThemeSelect={handleThemeSelect}
    />
  );
}

