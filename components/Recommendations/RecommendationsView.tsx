'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, TrendingUp, Search, Loader2, X, History } from 'lucide-react';
import { Sidebar } from '../PremiumDashboard/Sidebar';
import RecommendationCard, { Recommendation } from './RecommendationCard';
import FilterPanel, { Filters } from './FilterPanel';
import GameDetailModal from './GameDetailModal';
import recommendationsData from '@/data/recommendations.json';

// Type assertion for JSON data
const rawRecommendations = recommendationsData.recommendations as Recommendation[];

// Debounce delay in milliseconds
const FILTER_DEBOUNCE_MS = 1000;

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
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<Recommendation[] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [activeFiltersDescription, setActiveFiltersDescription] = useState<string | null>(null);
  // Search history cache: query -> games
  const [searchHistory, setSearchHistory] = useState<Record<string, Recommendation[]>>({});

  // Ref to store the debounce timeout
  const filterDebounceRef = useRef<NodeJS.Timeout | null>(null);
  // Ref to track if this is the initial mount (to avoid fetching on page load)
  const isInitialMount = useRef(true);
  // Ref to track if loading from history (to skip re-fetch)
  const loadingFromHistoryRef = useRef(false);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiSearchQuery.trim() || isSearching) return;

    const trimmedQuery = aiSearchQuery.trim();

    // Check if we already have cached results for this query
    const cachedResults = searchHistory[trimmedQuery];
    if (cachedResults) {
      // Use cached results instead of making an API call
      loadingFromHistoryRef.current = true;
      setAiRecommendations(cachedResults);
      setActiveQuery(trimmedQuery);
      setSearchError(null);
      setActiveFiltersDescription(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch('/api/recommendations/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: aiSearchQuery,
          filters: {
            genres: filters.genres.length > 0 ? filters.genres : undefined,
            modes: filters.modes.length > 0 ? filters.modes : undefined,
            difficulties: filters.difficulties.length > 0 ? filters.difficulties : undefined,
            playTimes: filters.playTimes.length > 0 ? filters.playTimes : undefined,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get recommendations');
      }

      setAiRecommendations(data.recommendations);
      setActiveQuery(aiSearchQuery);
      // Cache the search results
      setSearchHistory((prev) => ({
        ...prev,
        [aiSearchQuery.trim()]: data.recommendations,
      }));
    } catch (error) {
      console.error('AI Search error:', error);
      setSearchError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSearching(false);
    }
  };

  // Load cached search results instantly
  const loadFromHistory = (query: string) => {
    const cachedResults = searchHistory[query];
    if (cachedResults) {
      // Mark that we're loading from history to skip the useEffect re-fetch
      loadingFromHistoryRef.current = true;
      setAiRecommendations(cachedResults);
      setActiveQuery(query);
      setAiSearchQuery(query);
      setSearchError(null);
      setActiveFiltersDescription(null);
    }
  };

  // Remove a query from history
  const removeFromHistory = (query: string) => {
    setSearchHistory((prev) => {
      const newHistory = { ...prev };
      delete newHistory[query];
      return newHistory;
    });
  };

  const clearAiSearch = () => {
    setAiRecommendations(null);
    setActiveQuery(null);
    setAiSearchQuery('');
    setSearchError(null);
    setActiveFiltersDescription(null);
  };

  // Build description of active filters for display
  const buildFiltersDescription = useCallback((f: Filters): string => {
    const parts: string[] = [];
    if (f.genres.length > 0) parts.push(f.genres.join(', '));
    if (f.difficulties.length > 0) parts.push(f.difficulties.join(', '));
    if (f.playTimes.length > 0) {
      const timeLabels = f.playTimes.map((t) => {
        switch (t) {
          case 'short': return 'Quick';
          case 'medium': return 'Standard';
          case 'long': return 'Long';
          default: return t;
        }
      });
      parts.push(timeLabels.join(', '));
    }
    if (f.modes.length > 0) parts.push(f.modes.join(', '));
    return parts.join(' + ');
  }, []);

  // Fetch recommendations based on filters (and optionally the current search query)
  const fetchFilteredRecommendations = useCallback(async (currentFilters: Filters, currentQuery: string | null) => {
    // Check if any filters are active (not counting sortBy)
    const hasActiveFilters =
      currentFilters.genres.length > 0 ||
      currentFilters.difficulties.length > 0 ||
      currentFilters.playTimes.length > 0 ||
      currentFilters.modes.length > 0;

    // If no filters and no query, clear everything and show static data
    if (!hasActiveFilters && !currentQuery) {
      setAiRecommendations(null);
      setActiveQuery(null);
      setActiveFiltersDescription(null);
      setSearchError(null);
      return;
    }

    // If only query (no filters), keep existing AI results without re-fetching
    if (!hasActiveFilters && currentQuery) {
      // Just clear the filter description, keep the query results
      setActiveFiltersDescription(null);
      return;
    }

    setIsFilterLoading(true);
    setSearchError(null);

    try {
      const response = await fetch('/api/recommendations/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Include the search query if one is active
          query: currentQuery || undefined,
          filters: {
            genres: currentFilters.genres.length > 0 ? currentFilters.genres : undefined,
            modes: currentFilters.modes.length > 0 ? currentFilters.modes : undefined,
            difficulties: currentFilters.difficulties.length > 0 ? currentFilters.difficulties : undefined,
            playTimes: currentFilters.playTimes.length > 0 ? currentFilters.playTimes : undefined,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get recommendations');
      }

      setAiRecommendations(data.recommendations);
      // Keep the activeQuery if one exists, otherwise clear it
      // activeQuery is preserved - don't clear it here
      setActiveFiltersDescription(buildFiltersDescription(currentFilters));
    } catch (error) {
      console.error('Filter fetch error:', error);
      setSearchError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsFilterLoading(false);
    }
  }, [buildFiltersDescription]);

  // Debounced effect for filter changes
  useEffect(() => {
    // Skip the initial mount to avoid fetching on page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Skip if loading from history (we already have cached results)
    if (loadingFromHistoryRef.current) {
      loadingFromHistoryRef.current = false;
      return;
    }

    // Clear any existing timeout
    if (filterDebounceRef.current) {
      clearTimeout(filterDebounceRef.current);
    }

    // Set a new timeout for the debounced fetch
    filterDebounceRef.current = setTimeout(() => {
      // Pass the current activeQuery so filters combine with the search
      fetchFilteredRecommendations(filters, activeQuery);
    }, FILTER_DEBOUNCE_MS);

    // Cleanup on unmount or when filters change again
    return () => {
      if (filterDebounceRef.current) {
        clearTimeout(filterDebounceRef.current);
      }
    };
  }, [filters.genres, filters.difficulties, filters.playTimes, filters.modes, activeQuery, fetchFilteredRecommendations]);

  // Use AI recommendations if available, otherwise use static data
  const recommendations = aiRecommendations || rawRecommendations;

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
        <div className="flex-1 overflow-y-auto scroll-smooth">
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
                {activeQuery
                  ? 'AI-powered recommendations based on your query and gaming library'
                  : activeFiltersDescription
                  ? 'AI-powered recommendations based on your selected filters'
                  : 'Based on your gaming history, preferences, and playstyle'}
              </p>
            </motion.div>

            {/* AI Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <form onSubmit={handleAiSearch} className="relative">
                <div className="relative group">
                  {/* Gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-amber-500/50 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur transition-opacity duration-300" />

                  <div className="relative flex items-center bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl overflow-hidden group-hover:border-[#2A2A2A] group-focus-within:border-[#2A2A2A] transition-colors">
                    {/* AI Icon */}
                    <div className="flex items-center gap-2 pl-4 pr-2">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-md border border-violet-500/20">
                        <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                        <span className="text-xs font-medium text-violet-300">AI</span>
                      </div>
                    </div>

                    {/* Search Input */}
                    <input
                      type="text"
                      value={aiSearchQuery}
                      onChange={(e) => setAiSearchQuery(e.target.value)}
                      placeholder="Describe the type of game you're looking for..."
                      className="flex-1 bg-transparent py-4 pr-4 text-white/90 placeholder-[#606060] text-sm focus:outline-none"
                    />

                    {/* Search Button */}
                    <button
                      type="submit"
                      disabled={isSearching || !aiSearchQuery.trim()}
                      className="flex items-center gap-2 px-5 py-2 mr-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-[#2A2A2A] disabled:to-[#2A2A2A] disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-all duration-200"
                    >
                      {isSearching ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Searching</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          <span>Search</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Helper text */}
                <p className="mt-2 text-xs text-[#606060] ml-1">
                  Try: "A relaxing farming game with multiplayer" or "Fast-paced shooters like Valorant"
                </p>

                {/* Search History */}
                {Object.keys(searchHistory).length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <History className="w-3.5 h-3.5 text-[#606060]" />
                      <span className="text-xs text-[#606060]">Previous searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(searchHistory).map((query) => (
                        <div
                          key={query}
                          className="group flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border border-[#1E1E1E] rounded-full hover:border-violet-500/30 hover:bg-violet-500/5 transition-all cursor-pointer"
                        >
                          <button
                            onClick={() => loadFromHistory(query)}
                            className="text-sm text-[#A0A0A0] group-hover:text-violet-300 transition-colors"
                          >
                            {query}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromHistory(query);
                            }}
                            className="p-0.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded-full transition-all"
                            title="Remove from history"
                          >
                            <X className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {searchError && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400">{searchError}</p>
                  </div>
                )}

                {/* Filter Loading Indicator */}
                {isFilterLoading && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
                      <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      <span className="text-sm text-amber-300">
                        Finding games matching your filters...
                      </span>
                    </div>
                  </div>
                )}

                {/* Active Search + Filter Indicator */}
                {activeQuery && activeFiltersDescription && !isFilterLoading && (
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-500/10 to-amber-500/10 border border-violet-500/20 rounded-full">
                      <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-sm text-violet-300">
                        "{activeQuery}"
                      </span>
                      <span className="text-sm text-[#606060]">+</span>
                      <span className="text-sm text-amber-300">
                        {activeFiltersDescription}
                      </span>
                      <button
                        onClick={clearAiSearch}
                        className="ml-1 p-0.5 hover:bg-violet-500/20 rounded-full transition-colors"
                        title="Clear AI search"
                      >
                        <X className="w-3.5 h-3.5 text-violet-400" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Active Search Indicator (query only, no filters) */}
                {activeQuery && !activeFiltersDescription && !isFilterLoading && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full">
                      <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-sm text-violet-300">
                        AI results for: "{activeQuery}"
                      </span>
                      <button
                        onClick={clearAiSearch}
                        className="ml-1 p-0.5 hover:bg-violet-500/20 rounded-full transition-colors"
                        title="Clear AI search"
                      >
                        <X className="w-3.5 h-3.5 text-violet-400" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Active Filter Indicator (filters only, no query) */}
                {activeFiltersDescription && !activeQuery && !isFilterLoading && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-sm text-amber-300">
                        AI results for filters: {activeFiltersDescription}
                      </span>
                      <button
                        onClick={clearAiSearch}
                        className="ml-1 p-0.5 hover:bg-amber-500/20 rounded-full transition-colors"
                        title="Clear filter results"
                      >
                        <X className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>

            {/* Games Panel with Loading Overlay */}
            <div className="relative min-h-[400px]">
              {/* Loading Overlay */}
              {(isFilterLoading || isSearching) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center pt-12 bg-black/70 backdrop-blur-sm rounded-xl"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
                      <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-amber-400" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-white/90 mb-1">
                        Finding Your Perfect Games
                      </h3>
                      <p className="text-sm text-[#A0A0A0]">
                        {isSearching
                          ? 'Analyzing your preferences and searching...'
                          : 'Applying filters and fetching recommendations...'}
                      </p>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {filteredRecommendations.length === 0 && !isFilterLoading && !isSearching ? (
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
                <div className={isFilterLoading || isSearching ? 'opacity-30 pointer-events-none' : ''}>
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
                  {filteredRecommendations.length > 0 && (
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
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Panel - Fixed Right */}
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          availableGenres={availableGenres}
          isLoading={isFilterLoading}
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
