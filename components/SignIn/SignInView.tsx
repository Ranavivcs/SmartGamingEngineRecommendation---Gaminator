'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { GameBackground } from '../GameBackground/GameBackground';
import { ParticleEffect } from '../ParticleEffect/ParticleEffect';
import { ThemeSelector } from '../ThemeSelector/ThemeSelector';
import { LoginCard } from '../LoginCard/LoginCard';
import { BottomGradient } from '../BottomGradient/BottomGradient';
import { AmbientLights } from '../AmbientLights/AmbientLights';
import type { Theme } from '@/types/theme';

interface SignInViewProps {
  theme: Theme;
  backgroundUrl: string;
  onThemeChange: (theme: Theme) => void;
}

export function SignInView({
  theme,
  backgroundUrl,
  onThemeChange,
}: SignInViewProps) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GameBackground imageUrl={backgroundUrl} theme={theme} />
        </motion.div>
      </AnimatePresence>

      {/* Particle Effects */}
      <ParticleEffect theme={theme} />

      {/* Theme Selector */}
      <ThemeSelector theme={theme} onThemeChange={onThemeChange} />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <LoginCard theme={theme} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Decorative Elements */}
      <BottomGradient theme={theme} />

      {/* Ambient Light Spots */}
      <AmbientLights theme={theme} />
    </div>
  );
}

