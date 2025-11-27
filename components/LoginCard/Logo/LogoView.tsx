'use client';

import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import type { ThemeColors } from '@/types/theme';

interface LogoViewProps {
  colors: ThemeColors;
}

export function LogoView({ colors }: LogoViewProps) {
  return (
    <motion.div
      className="flex justify-center mb-8"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div
        className="relative w-16 h-16 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${colors.border}, ${colors.glow})`,
          boxShadow: colors.accentGlow,
        }}
      >
        <Gamepad2 className="w-8 h-8 text-white" />

        {/* Logo corner accents */}
        <div
          className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 rounded-tl-xl"
          style={{ borderColor: colors.border }}
        />
        <div
          className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 rounded-br-xl"
          style={{ borderColor: colors.border }}
        />
      </div>
    </motion.div>
  );
}

