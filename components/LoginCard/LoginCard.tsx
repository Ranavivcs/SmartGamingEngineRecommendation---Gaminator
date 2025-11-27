'use client';

import { LoginCardView } from './LoginCardView';
import { getThemeColors } from '@/types/theme';
import type { Theme } from '@/types/theme';

interface LoginCardProps {
  theme: Theme;
}

export function LoginCard({ theme }: LoginCardProps) {
  const colors = getThemeColors(theme);

  return <LoginCardView theme={theme} colors={colors} />;
}

