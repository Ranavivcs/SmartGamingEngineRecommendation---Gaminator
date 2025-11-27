'use client';

import { LogoView } from './LogoView';
import type { ThemeColors } from '@/types/theme';
import type { Theme } from '@/types/theme';

interface LogoProps {
  theme: Theme;
  colors: ThemeColors;
}

export function Logo({ theme, colors }: LogoProps) {
  return <LogoView colors={colors} />;
}

