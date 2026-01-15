'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Trophy, Clock, Users, Gamepad2, Sparkles, Calendar, Tag, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Recommendation } from './RecommendationCard';
import { useReviewModal } from './ReviewModalContext';

interface GameDetailModalProps {
  recommendation: Recommendation | null;
  isOpen: boolean;
  onClose: () => void;
  onReview: (game: Recommendation, reaction: 'like' | 'dislike', reasons?: string[], detailsText?: string) => void;
  isDislikeModalOpen: boolean;
  isThankYouOpen: boolean;
}

const modeLabels = {
  solo: 'Solo',
  coop: 'Co-op',
  multiplayer: 'Multiplayer',
};

const modeIcons = {
  solo: <Gamepad2 className="w-4 h-4" />,
  coop: <Users className="w-4 h-4" />,
  multiplayer: <Users className="w-4 h-4" />,
};

const playTimeLabels = {
  short: 'Quick Sessions (< 2 hours)',
  medium: 'Standard Sessions (2-4 hours)',
  long: 'Long Sessions (4+ hours)',
};

const difficultyConfig = {
  casual: { label: 'Casual', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  moderate: { label: 'Moderate', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  challenging: { label: 'Challenging', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export default function GameDetailModal({ 
  recommendation, 
  isOpen, 
  onClose,
  onReview,
  isDislikeModalOpen: globalDislikeModalOpen,
  isThankYouOpen,
}: GameDetailModalProps) {
  const { openDislikeModal } = useReviewModal();

  if (!recommendation) return null;

  const diffConfig = difficultyConfig[recommendation.difficulty];

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReview(recommendation, 'like');
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    openDislikeModal(recommendation);
  };

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[85vh] bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header Image */}
            <div className="relative h-48 md:h-64 shrink-0">
              <Image
                src={recommendation.image}
                alt={recommendation.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 border border-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Match Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">{recommendation.similarity}% Match</span>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight truncate">
                      {recommendation.name}
                    </h2>
                    <p className="text-[#B5B5B5] mt-1">{recommendation.genre}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={handleLike}
                      disabled={globalDislikeModalOpen || isThankYouOpen}
                      className="p-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 rounded-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500/10"
                      title="Like this recommendation"
                    >
                      <ThumbsUp className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={handleDislike}
                      disabled={globalDislikeModalOpen || isThankYouOpen}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500/10"
                      title="Dislike this recommendation"
                    >
                      <ThumbsDown className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#141414] border border-[#1E1E1E] rounded-lg p-3">
                  <div className="flex items-center gap-2 text-[#A0A0A0] text-xs mb-1">
                    {modeIcons[recommendation.mode]}
                    <span>Play Style</span>
                  </div>
                  <p className="text-white font-medium">{modeLabels[recommendation.mode]}</p>
                </div>

                <div className="bg-[#141414] border border-[#1E1E1E] rounded-lg p-3">
                  <div className="flex items-center gap-2 text-[#A0A0A0] text-xs mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Session Length</span>
                  </div>
                  <p className="text-white font-medium">{playTimeLabels[recommendation.playTime].split('(')[0].trim()}</p>
                </div>

                <div className="bg-[#141414] border border-[#1E1E1E] rounded-lg p-3">
                  <div className="flex items-center gap-2 text-[#A0A0A0] text-xs mb-1">
                    <Trophy className="w-4 h-4" />
                    <span>Difficulty</span>
                  </div>
                  <p className={`font-medium ${recommendation.difficulty === 'challenging' ? 'text-red-400' : recommendation.difficulty === 'moderate' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {diffConfig.label}
                  </p>
                </div>

                <div className="bg-[#141414] border border-[#1E1E1E] rounded-lg p-3">
                  <div className="flex items-center gap-2 text-[#A0A0A0] text-xs mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Released</span>
                  </div>
                  <p className="text-white font-medium">
                    {new Date(recommendation.releaseDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </p>
                </div>
              </div>

              {/* Why This Game */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Why This Game?
                </h3>
                <p className="text-[#B5B5B5] leading-relaxed">
                  {recommendation.description}
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#A0A0A0]" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recommendation.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#141414] border border-[#1E1E1E] hover:border-[#2A2A2A] rounded-lg text-sm text-[#B5B5B5] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={`https://store.steampowered.com/search/?term=${encodeURIComponent(recommendation.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1B2838] to-[#2A475E] hover:from-[#2A475E] hover:to-[#3D6A8A] border border-[#4FC3F7]/30 rounded-lg text-white font-medium transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Steam
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
