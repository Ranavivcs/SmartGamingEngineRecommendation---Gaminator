'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';
import { DISLIKE_REASONS } from '@/types/review';

interface DislikeFeedbackModalProps {
  gameTitle: string;
  gameId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reasons: string[], detailsText: string) => void;
}

export default function DislikeFeedbackModal({
  gameTitle,
  gameId,
  isOpen,
  onClose,
  onSubmit,
}: DislikeFeedbackModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedReasons, setSelectedReasons] = useState<Set<string>>(new Set());
  const [detailsText, setDetailsText] = useState('');

  const handleReasonToggle = (reason: string) => {
    setSelectedReasons((prev) => {
      const next = new Set(prev);
      if (next.has(reason)) {
        next.delete(reason);
      } else {
        next.add(reason);
      }
      return next;
    });
  };

  const handleNext = () => {
    if (selectedReasons.size > 0) {
      setStep(2);
    }
  };

  const handleSkipFeedback = () => {
    // Reset state
    setStep(1);
    setSelectedReasons(new Set());
    setDetailsText('');
    // Submit empty review and close
    onSubmit([], '');
    onClose();
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    onSubmit(Array.from(selectedReasons), detailsText);
    handleClose();
  };

  const handleSkipText = () => {
    onSubmit(Array.from(selectedReasons), '');
    handleClose();
  };

  const handleClose = () => {
    // Reset state
    setStep(1);
    setSelectedReasons(new Set());
    setDetailsText('');
    // Don't call onClose here - it's only for skip feedback
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSkipFeedback}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl overflow-hidden z-[9999] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1E1E1E]">
              <h2 className="text-xl font-semibold text-white">What didn't work for you?</h2>
              <button
                onClick={handleSkipFeedback}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#B5B5B5]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 ? (
                <div className="space-y-4">
                  <p className="text-[#B5B5B5] text-sm mb-6">
                    Help us improve by selecting one or more reasons why this recommendation didn't work for you.
                  </p>
                  <div className="space-y-2">
                    {DISLIKE_REASONS.map((reason) => {
                      const isSelected = selectedReasons.has(reason);
                      return (
                        <button
                          key={reason}
                          onClick={() => handleReasonToggle(reason)}
                          className={`w-full text-left p-4 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-red-500/10 border-red-500/50 text-white'
                              : 'bg-[#141414] border-[#1E1E1E] text-[#B5B5B5] hover:border-red-500/30 hover:bg-red-500/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? 'bg-red-500 border-red-500'
                                  : 'border-[#2A2A2A]'
                              }`}
                            >
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className="text-sm font-medium">{reason}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Anything else you'd like to tell us? (optional)
                    </h3>
                    <textarea
                      value={detailsText}
                      onChange={(e) => setDetailsText(e.target.value)}
                      placeholder="Share any additional feedback..."
                      className="w-full h-32 p-4 bg-[#141414] border border-[#1E1E1E] rounded-lg text-white placeholder-[#606060] focus:outline-none focus:border-red-500/50 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-[#1E1E1E] gap-3">
              {step === 1 ? (
                <>
                  <button
                    onClick={handleSkipFeedback}
                    className="px-4 py-2 text-sm text-[#B5B5B5] hover:text-white transition-colors"
                  >
                    Skip feedback
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={handleNext}
                      disabled={selectedReasons.size === 0}
                      className="px-6 py-2 bg-red-600 hover:bg-red-500 disabled:bg-[#2A2A2A] disabled:text-[#606060] disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#B5B5B5] hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSkipText}
                      className="px-4 py-2 text-sm text-[#B5B5B5] hover:text-white transition-colors"
                    >
                      Skip
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
