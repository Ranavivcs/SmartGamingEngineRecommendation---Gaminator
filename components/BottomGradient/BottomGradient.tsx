'use client';

import { BottomGradientView } from './BottomGradientView';
import { THEME_CONFIGS } from '@/types/theme';
import type { Theme } from '@/types/theme';

interface BottomGradientProps {
  theme: Theme;
}

export function BottomGradient({ theme }: BottomGradientProps) {
  const themeColor = THEME_CONFIGS[theme].color;

  return <BottomGradientView themeColor={themeColor} />;
}

