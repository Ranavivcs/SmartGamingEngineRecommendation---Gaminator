'use client';

import { motion } from 'framer-motion';
import { ThemeDropdownItem } from './ThemeDropdownItem/ThemeDropdownItem';
import { THEME_CONFIGS } from '@/types/theme';
import type { Theme } from '@/types/theme';

interface ThemeDropdownViewProps {
  currentTheme: Theme;
  onThemeSelect: (theme: Theme) => void;
}

export function ThemeDropdownView({
  currentTheme,
  onThemeSelect,
}: ThemeDropdownViewProps) {
  const themeColor = THEME_CONFIGS[currentTheme].color;
  const themes = Object.keys(THEME_CONFIGS) as Theme[];

  return (
    <motion.div
      className="fixed top-20 right-6 z-50 rounded-xl overflow-hidden backdrop-blur-md"
      style={{
        background: 'rgba(15, 18, 30, 0.9)',
        border: `1px solid ${themeColor}`,
        boxShadow: `0 0 30px ${themeColor}40`,
      }}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-2 space-y-1">
        {themes.map((theme) => (
          <ThemeDropdownItem
            key={theme}
            theme={theme}
            isActive={currentTheme === theme}
            onSelect={onThemeSelect}
          />
        ))}
      </div>
    </motion.div>
  );
}

