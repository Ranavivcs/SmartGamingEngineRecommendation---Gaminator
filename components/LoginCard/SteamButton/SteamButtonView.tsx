'use client';

import { motion } from 'framer-motion';
import { SteamIcon } from './SteamIcon';

export function SteamButtonView() {
  return (
    <motion.button
      className="group relative w-full rounded-lg overflow-hidden transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, #1B2838 0%, #0A3D62 100%)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(135deg, rgba(91, 192, 235, 0.2), rgba(10, 61, 98, 0.3))',
          boxShadow: '0 0 20px rgba(91, 192, 235, 0.3)',
        }}
      />

      {/* Button Content */}
      <div className="relative flex items-center justify-center gap-3 py-4 px-6">
        <SteamIcon />
        <span className="text-white">Sign in with Steam</span>
      </div>
    </motion.button>
  );
}

