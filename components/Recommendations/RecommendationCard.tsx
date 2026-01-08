'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Trophy, Clock, Users, Gamepad2, Sparkles } from 'lucide-react';

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
}

export type TrophyTier = 'gold' | 'silver' | 'bronze';

interface RecommendationCardProps {
  recommendation: Recommendation;
  tier: TrophyTier;
  index: number;
  onClick?: () => void;
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

export default function RecommendationCard({ recommendation, tier, index, onClick }: RecommendationCardProps) {
  const config = tierConfig[tier];
  const isGold = tier === 'gold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
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
          <h3 className={`font-semibold text-white/90 tracking-tight truncate ${isGold ? 'text-xl' : 'text-lg'}`}>
            {recommendation.name}
          </h3>
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
