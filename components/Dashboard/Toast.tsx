'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 bg-[#0f1a0f] border border-[#1a3a1a] rounded-lg shadow-lg p-4 min-w-[280px] max-w-[400px]"
          style={{
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)',
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 flex-shrink-0 mt-0.5" />
              <p className="text-white/90 text-sm">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="text-[#B5B5B5] hover:text-white transition-colors flex-shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

