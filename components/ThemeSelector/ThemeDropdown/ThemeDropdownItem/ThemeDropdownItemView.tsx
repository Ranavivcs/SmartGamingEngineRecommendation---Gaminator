'use client';

import { motion } from 'framer-motion';
import { THEME_CONFIGS } from '@/types/theme';
import type { Theme } from '@/types/theme';

interface ThemeDropdownItemViewProps {
  theme: Theme;
  isActive: boolean;
  onSelect: (theme: Theme) => void;
}

export function ThemeDropdownItemView({
  theme,
  isActive,
  onSelect,
}: ThemeDropdownItemViewProps) {
  const themeConfig = THEME_CONFIGS[theme];
  const handleClick = () => onSelect(theme);

  return (
    <button
      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 group"
      style={{
        background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isActive
          ? 'rgba(255, 255, 255, 0.1)'
          : 'transparent';
      }}
    >
      <div
        className="w-4 h-4 rounded-full"
        style={{
          background: themeConfig.color,
          boxShadow: `0 0 10px ${themeConfig.color}`,
        }}
      />
      <span className="text-white text-sm">{themeConfig.label}</span>
      {isActive && (
        <motion.div
          className="ml-auto w-2 h-2 rounded-full"
          style={{ background: themeConfig.color }}
          layoutId="activeTheme"
        />
      )}
    </button>
  );
}

