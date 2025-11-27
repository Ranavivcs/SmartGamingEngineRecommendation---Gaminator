'use client';

import { AmbientLightsView } from './AmbientLightsView';
import { THEME_CONFIGS } from '@/types/theme';
import type { Theme } from '@/types/theme';

interface AmbientLightsProps {
  theme: Theme;
}

export function AmbientLights({ theme }: AmbientLightsProps) {
  const themeColor = THEME_CONFIGS[theme].color;

  return <AmbientLightsView themeColor={themeColor} />;
}

