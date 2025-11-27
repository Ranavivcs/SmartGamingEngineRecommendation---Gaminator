'use client';

import { GameBackgroundView } from './GameBackgroundView';
import { getOverlayGradient } from '@/types/theme';
import type { Theme } from '@/types/theme';

interface GameBackgroundProps {
  imageUrl: string;
  theme: Theme;
}

export function GameBackground({ imageUrl, theme }: GameBackgroundProps) {
  const overlayGradient = getOverlayGradient(theme);

  return (
    <GameBackgroundView
      imageUrl={imageUrl}
      overlayGradient={overlayGradient}
    />
  );
}

