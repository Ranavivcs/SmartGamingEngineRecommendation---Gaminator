'use client';

import { motion } from 'framer-motion';

interface AmbientLightsViewProps {
  themeColor: string;
}

export function AmbientLightsView({ themeColor }: AmbientLightsViewProps) {
  return (
    <>
      <motion.div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: themeColor }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: themeColor }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </>
  );
}

