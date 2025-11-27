'use client';

import { useEffect, useState } from 'react';
import { ParticleEffectView } from './ParticleEffectView';
import { getParticleColor } from '@/types/theme';
import type { Theme } from '@/types/theme';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ParticleEffectProps {
  theme: Theme;
}

export function ParticleEffect({ theme }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      });
    }
    setParticles(newParticles);
  }, []);

  const particleColor = getParticleColor(theme);

  return <ParticleEffectView particles={particles} particleColor={particleColor} />;
}

