'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ThankYouMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

const THANK_YOU_MESSAGE = `Thank you for your time and for your review 
We promise your next recommendation will be ever better
you can find us at WWW.YourPerfectGame.com 24/7 support line available for you with immediate response and free money (also free shipping)`;

export default function ThankYouMessage({ isOpen, onClose }: ThankYouMessageProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl overflow-hidden z-[70] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1E1E1E]">
              <h2 className="text-xl font-semibold text-white">Thank You!</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#B5B5B5]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-[#B5B5B5] text-sm whitespace-pre-line leading-relaxed">
                {THANK_YOU_MESSAGE}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-6 border-t border-[#1E1E1E]">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-lg text-sm font-medium transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
