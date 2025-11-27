'use client';

import { ThemeButtonView } from './ThemeButtonView';

interface ThemeButtonProps {
  themeColor: string;
  onToggle: () => void;
}

export function ThemeButton({ themeColor, onToggle }: ThemeButtonProps) {
  return <ThemeButtonView themeColor={themeColor} onToggle={onToggle} />;
}

