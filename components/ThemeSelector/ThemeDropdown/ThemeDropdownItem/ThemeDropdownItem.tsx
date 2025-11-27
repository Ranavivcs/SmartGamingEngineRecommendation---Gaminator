'use client';

import { ThemeDropdownItemView } from './ThemeDropdownItemView';
import type { Theme } from '@/types/theme';

interface ThemeDropdownItemProps {
  theme: Theme;
  isActive: boolean;
  onSelect: (theme: Theme) => void;
}

export function ThemeDropdownItem({
  theme,
  isActive,
  onSelect,
}: ThemeDropdownItemProps) {
  return (
    <ThemeDropdownItemView
      theme={theme}
      isActive={isActive}
      onSelect={onSelect}
    />
  );
}

