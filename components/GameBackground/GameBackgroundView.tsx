'use client';

import { motion } from 'framer-motion';

interface GameBackgroundViewProps {
  imageUrl: string;
  overlayGradient: string;
}

export function GameBackgroundView({
  imageUrl,
  overlayGradient,
}: GameBackgroundViewProps) {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.15 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
      </motion.div>

      {/* Overlay Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: overlayGradient,
        }}
      />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />

      {/* Animated Scanlines */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.05) 2px, rgba(255, 255, 255, 0.05) 4px)',
        }}
        animate={{
          y: [0, 100],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

