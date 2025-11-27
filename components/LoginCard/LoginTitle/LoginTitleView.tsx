'use client';

import { motion } from 'framer-motion';

export function LoginTitleView() {
  return (
    <>
      <motion.h1
        className="text-center text-white mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Sign in to continue
      </motion.h1>

      <motion.p
        className="text-center text-gray-400 mb-8 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Get personalized game recommendations
      </motion.p>
    </>
  );
}

