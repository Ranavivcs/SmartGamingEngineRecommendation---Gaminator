'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Trophy, Clock, Users, Gamepad2, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useReviewModal } from './ReviewModalContext';

export interface Recommendation {
  name: string;
  image: string;
  similarity: number;
  genre: string;
  mode: 'solo' | 'coop' | 'multiplayer';
  difficulty: 'casual' | 'moderate' | 'challenging';
  playTime: 'short' | 'medium' | 'long';
  releaseDate: string;
  description: string;
  tags: string[];
  reviewMessage?: string; // Optional personalized message based on reviews
}

export type TrophyTier = 'gold' | 'silver' | 'bronze';

interface RecommendationCardProps {
  recommendation: Recommendation;
  tier: TrophyTier;
  index: number;
  onClick?: () => void;
  onReview: (game: Recommendation, reaction: 'like' | 'dislike', reasons?: string[], detailsText?: string) => void;
  isDislikeModalOpen: boolean;
  isThankYouOpen: boolean;
  isExiting?: boolean;
}

const tierConfig = {
  gold: {
    borderColor: 'border-amber-500/50',
    hoverBorderColor: 'hover:border-amber-400/70',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    trophyColor: '#F59E0B',
    badgeGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    label: 'Best Match',
  },
  silver: {
    borderColor: 'border-slate-400/40',
    hoverBorderColor: 'hover:border-slate-300/60',
    glowColor: 'rgba(148, 163, 184, 0.12)',
    trophyColor: '#94A3B8',
    badgeGradient: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
    label: 'Great Match',
  },
  bronze: {
    borderColor: 'border-orange-700/40',
    hoverBorderColor: 'hover:border-orange-600/50',
    glowColor: 'rgba(194, 65, 12, 0.1)',
    trophyColor: '#C2410C',
    badgeGradient: 'linear-gradient(135deg, #C2410C 0%, #9A3412 100%)',
    label: 'Good Match',
  },
};

const modeLabels = {
  solo: 'Solo',
  coop: 'Co-op',
  multiplayer: 'Multiplayer',
};

const modeIcons = {
  solo: <Gamepad2 className="w-3.5 h-3.5" />,
  coop: <Users className="w-3.5 h-3.5" />,
  multiplayer: <Users className="w-3.5 h-3.5" />,
};

const playTimeLabels = {
  short: '< 2h sessions',
  medium: '2-4h sessions',
  long: '4h+ sessions',
};

export default function RecommendationCard({ 
  recommendation, 
  tier, 
  index, 
  onClick,
  onReview,
  isDislikeModalOpen,
  isThankYouOpen,
  isExiting = false,
}: RecommendationCardProps) {
  const config = tierConfig[tier];
  const isGold = tier === 'gold';
  const { openDislikeModal } = useReviewModal();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReview(recommendation, 'like');
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    openDislikeModal(recommendation);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isExiting ? { opacity: 0, x: -1000, scale: 0.8 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -1000, scale: 0.8 }}
      transition={{ 
        duration: isExiting ? 0.5 : 0.4, 
        delay: isExiting ? 0 : index * 0.1,
        ease: isExiting ? 'easeIn' : 'easeOut'
      }}
      whileHover={isExiting ? {} : { y: -4 }}
      onClick={onClick}
      className={`relative bg-[#141414] rounded-xl border ${config.borderColor} ${config.hoverBorderColor} transition-all duration-300 overflow-hidden group cursor-pointer ${isGold ? 'max-w-2xl' : ''}`}
      style={{
        boxShadow: `0 4px 20px ${config.glowColor}`,
      }}
    >
      {/* Trophy Badge */}
      <div
        className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white"
        style={{ background: config.badgeGradient }}
      >
        <Trophy className="w-3.5 h-3.5" />
        <span>{config.label}</span>
      </div>

      {/* Similarity Badge */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm border border-white/20 text-white">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{recommendation.similarity}% Match</span>
      </div>

      {/* Image Section */}
      <div className={`relative ${isGold ? 'aspect-[2.5/1]' : 'aspect-[16/9]'} overflow-hidden`}>
        <Image
          src={recommendation.image}
          alt={recommendation.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

        {/* Gold tier extra glow */}
        {isGold && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
            }}
          />
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title & Genre */}
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className={`font-semibold text-white/90 tracking-tight truncate flex-1 ${isGold ? 'text-xl' : 'text-lg'}`}>
              {recommendation.name}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleLike}
                disabled={isDislikeModalOpen || isThankYouOpen}
                className="p-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 rounded-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500/10"
                title="Like this recommendation"
              >
                <ThumbsUp className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleDislike}
                disabled={isDislikeModalOpen || isThankYouOpen}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500/10"
                title="Dislike this recommendation"
              >
                <ThumbsDown className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
          <p className="text-sm text-[#B5B5B5]">{recommendation.genre}</p>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80">
            {modeIcons[recommendation.mode]}
            {modeLabels[recommendation.mode]}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80">
            <Clock className="w-3.5 h-3.5" />
            {playTimeLabels[recommendation.playTime]}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            recommendation.difficulty === 'challenging'
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : recommendation.difficulty === 'moderate'
              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
              : 'bg-green-500/10 text-green-400 border border-green-500/20'
          }`}>
            {recommendation.difficulty.charAt(0).toUpperCase() + recommendation.difficulty.slice(1)}
          </span>
        </div>

        {/* Review Message (if available) */}
        {recommendation.reviewMessage && (
          <div className="px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-2">
            <p className="text-xs text-blue-300 leading-relaxed">
              💡 {recommendation.reviewMessage}
            </p>
          </div>
        )}

        {/* Description - Only show full on gold tier */}
        <p className={`text-sm text-[#A0A0A0] leading-relaxed ${isGold ? '' : 'line-clamp-2'}`}>
          {recommendation.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {recommendation.tags.slice(0, isGold ? 8 : 4).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded text-xs text-[#B5B5B5]"
            >
              {tag}
            </span>
          ))}
          {!isGold && recommendation.tags.length > 4 && (
            <span className="px-2 py-0.5 text-xs text-[#A0A0A0]">
              +{recommendation.tags.length - 4} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
