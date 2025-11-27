'use client';

import { motion } from 'framer-motion';
import { Logo } from './Logo/Logo';
import { LoginTitle } from './LoginTitle/LoginTitle';
import { SteamButton } from './SteamButton/SteamButton';
import { PrivacyText } from './PrivacyText/PrivacyText';
import { CardCorners } from './CardCorners/CardCorners';
import type { ThemeColors } from '@/types/theme';
import type { Theme } from '@/types/theme';

interface LoginCardViewProps {
  theme: Theme;
  colors: ThemeColors;
}

export function LoginCardView({ theme, colors }: LoginCardViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-10 w-full max-w-[420px] mx-auto px-4"
    >
      {/* Card Reflection */}
      <div
        className="absolute inset-x-0 -bottom-2 h-full opacity-20 blur-xl"
        style={{
          background: `linear-gradient(to bottom, ${colors.glow}, transparent)`,
        }}
      />

      {/* Main Card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(15, 18, 30, 0.75)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.border}`,
          boxShadow: `${colors.accentGlow}, inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
        }}
      >
        {/* Inner Glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at top, ${colors.glow}, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative p-8 md:p-12">
          <Logo theme={theme} colors={colors} />
          <LoginTitle />
          <SteamButton />
          <PrivacyText />
          <CardCorners borderColor={colors.border} />
        </div>
      </div>
    </motion.div>
  );
}

