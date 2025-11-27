'use client';

import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

interface ThemeButtonViewProps {
  themeColor: string;
  onToggle: () => void;
}

export function ThemeButtonView({
  themeColor,
  onToggle,
}: ThemeButtonViewProps) {
  return (
    <motion.button
      className="fixed top-6 right-6 z-50 p-3 rounded-xl backdrop-blur-md transition-all duration-300"
      style={{
        background: 'rgba(15, 18, 30, 0.6)',
        border: `1px solid ${themeColor}`,
        boxShadow: `0 0 20px ${themeColor}40`,
      }}
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Palette className="w-5 h-5 text-white" />
    </motion.button>
  );
}

