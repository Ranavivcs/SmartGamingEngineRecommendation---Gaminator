'use client';

import { motion } from 'framer-motion';

export function PrivacyTextView() {
  return (
    <motion.p
      className="text-center text-gray-500 mt-6 text-xs leading-relaxed"
      style={{ opacity: 0.6 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      We only use your Steam library to generate personalized game recommendations.
    </motion.p>
  );
}

