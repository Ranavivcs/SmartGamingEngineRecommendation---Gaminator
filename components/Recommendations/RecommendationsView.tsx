'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, TrendingUp } from 'lucide-react';
import { Sidebar } from '../PremiumDashboard/Sidebar';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import FilterPanel, { Filters } from './FilterPanel';
import GameDetailModal from './GameDetailModal';
import recommendationsData from '@/data/recommendations.json';

// Type assertion for JSON data
const rawRecommendations = recommendationsData.recommendations as Recommendation[];

export default function RecommendationsView() {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    genres: [],
    difficulties: [],
    playTimes: [],
    modes: [],
    sortBy: 'similarity',
  });
  const [selectedGame, setSelectedGame] = useState<Recommendation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recommendations = rawRecommendations;

  const handleCardClick = (recommendation: Recommendation) => {
    setSelectedGame(recommendation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  // Get unique genres from recommendations
  const availableGenres = useMemo(() => {
    const genres = new Set(recommendations.map((r) => r.genre));
    return Array.from(genres);
  }, [recommendations]);

  // Filter and sort recommendations
  const filteredRecommendations = useMemo(() => {
    let result = [...recommendations];

    // Apply filters
    if (filters.genres.length > 0) {
      result = result.filter((r) => filters.genres.includes(r.genre));
    }
    if (filters.difficulties.length > 0) {
      result = result.filter((r) => filters.difficulties.includes(r.difficulty));
    }
    if (filters.playTimes.length > 0) {
      result = result.filter((r) => filters.playTimes.includes(r.playTime));
    }
    if (filters.modes.length > 0) {
      result = result.filter((r) => filters.modes.includes(r.mode));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'similarity':
        result.sort((a, b) => b.similarity - a.similarity);
        break;
      case 'releaseDate':
        result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [recommendations, filters]);

  const goldRecommendation = filteredRecommendations[0];
  const silverRecommendations = filteredRecommendations.slice(1, 4);
  const bronzeRecommendations = filteredRecommendations.slice(4);

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 80% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar activeItem="explore" onLogout={handleLogout} />

      {/* Main Content */}
      <div className="ml-20 flex h-screen relative z-10">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-12 px-8 max-w-[1400px]">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <h1 className="text-3xl font-bold text-white/90 tracking-tight">
                  Recommended For You
                </h1>
              </div>
              <p className="text-[#B5B5B5] text-sm ml-12">
                Based on your gaming history, preferences, and playstyle
              </p>
            </motion.div>

            {filteredRecommendations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="p-4 bg-[#141414] rounded-full border border-[#1E1E1E] mb-4">
                  <Trophy className="w-8 h-8 text-[#A0A0A0]" />
                </div>
                <h3 className="text-lg font-medium text-white/90 mb-2">No matches found</h3>
                <p className="text-[#A0A0A0] text-sm max-w-md">
                  Try adjusting your filters to discover more games that match your preferences.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Gold Tier - Featured Recommendation */}
                {goldRecommendation && (
                  <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      <h2 className="text-lg font-medium text-white/90">Top Pick</h2>
                    </div>
                    <RecommendationCard
                      recommendation={goldRecommendation}
                      tier="gold"
                      index={0}
                      onClick={() => handleCardClick(goldRecommendation)}
                    />
                  </section>
                )}

                {/* Silver Tier */}
                {silverRecommendations.length > 0 && (
                  <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className="w-5 h-5 text-slate-400" />
                      <h2 className="text-lg font-medium text-white/90">Great Matches</h2>
                      <span className="text-sm text-[#A0A0A0]">({silverRecommendations.length})</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {silverRecommendations.map((rec, index) => (
                        <RecommendationCard
                          key={rec.name}
                          recommendation={rec}
                          tier="silver"
                          index={index + 1}
                          onClick={() => handleCardClick(rec)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Bronze Tier */}
                {bronzeRecommendations.length > 0 && (
                  <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className="w-5 h-5 text-orange-700" />
                      <h2 className="text-lg font-medium text-white/90">More Recommendations</h2>
                      <span className="text-sm text-[#A0A0A0]">({bronzeRecommendations.length})</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {bronzeRecommendations.map((rec, index) => (
                        <RecommendationCard
                          key={rec.name}
                          recommendation={rec}
                          tier="bronze"
                          index={index + 4}
                          onClick={() => handleCardClick(rec)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Stats Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-6 border-t border-[#1E1E1E] flex items-center justify-between"
                >
                  <div className="flex items-center gap-6 text-sm text-[#A0A0A0]">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>
                        {filteredRecommendations.length} recommendation
                        {filteredRecommendations.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div>
                      Average match:{' '}
                      <span className="text-white/80">
                        {Math.round(
                          filteredRecommendations.reduce((acc, r) => acc + r.similarity, 0) /
                            filteredRecommendations.length
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Filter Panel - Fixed Right */}
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          availableGenres={availableGenres}
        />
      </div>

      {/* Game Detail Modal */}
      <GameDetailModal
        recommendation={selectedGame}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
