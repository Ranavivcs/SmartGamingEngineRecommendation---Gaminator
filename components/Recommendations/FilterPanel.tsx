'use client';

import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface Filters {
  genres: string[];
  difficulties: string[];
  playTimes: string[];
  modes: string[];
  sortBy: 'similarity' | 'releaseDate' | 'name';
}

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  availableGenres: string[];
}

const difficulties = [
  { id: 'casual', label: 'Casual', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  { id: 'moderate', label: 'Moderate', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { id: 'challenging', label: 'Challenging', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
];

const playTimes = [
  { id: 'short', label: 'Quick Sessions', description: '< 2 hours' },
  { id: 'medium', label: 'Standard', description: '2-4 hours' },
  { id: 'long', label: 'Long Sessions', description: '4+ hours' },
];

const modes = [
  { id: 'solo', label: 'Solo' },
  { id: 'coop', label: 'Co-op' },
  { id: 'multiplayer', label: 'Multiplayer' },
];

const sortOptions = [
  { id: 'similarity', label: 'Best Match' },
  { id: 'releaseDate', label: 'Newest' },
  { id: 'name', label: 'A-Z' },
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#1E1E1E] pb-4 last:border-b-0 last:pb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 text-[#A0A0A0] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="pt-2">{children}</div>
      </motion.div>
    </div>
  );
}

export default function FilterPanel({ filters, onFiltersChange, availableGenres }: FilterPanelProps) {
  const activeFilterCount =
    filters.genres.length +
    filters.difficulties.length +
    filters.playTimes.length +
    filters.modes.length;

  const toggleArrayFilter = (
    key: 'genres' | 'difficulties' | 'playTimes' | 'modes',
    value: string
  ) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      genres: [],
      difficulties: [],
      playTimes: [],
      modes: [],
      sortBy: 'similarity',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-72 shrink-0 bg-[#0D0D0D]/80 backdrop-blur-sm border-l border-[#1E1E1E] h-full overflow-y-auto"
    >
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/70" />
            <span className="text-sm font-medium text-white/90">Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 bg-white/10 rounded text-xs text-white/80">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs text-[#A0A0A0] hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="text-xs text-[#A0A0A0] uppercase tracking-wider">Sort By</label>
          <div className="flex flex-wrap gap-1.5">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  onFiltersChange({ ...filters, sortBy: option.id as Filters['sortBy'] })
                }
                className={`px-3 py-1.5 rounded text-xs transition-all duration-200 ${
                  filters.sortBy === option.id
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#1E1E1E]" />

        {/* Genre Filter */}
        <FilterSection title="Genre">
          <div className="flex flex-wrap gap-1.5">
            {availableGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleArrayFilter('genres', genre)}
                className={`px-2.5 py-1 rounded text-xs transition-all duration-200 ${
                  filters.genres.includes(genre)
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Difficulty Filter */}
        <FilterSection title="Difficulty">
          <div className="space-y-1.5">
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => toggleArrayFilter('difficulties', diff.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-all duration-200 ${
                  filters.difficulties.includes(diff.id)
                    ? `${diff.color} border`
                    : 'bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]'
                }`}
              >
                <span>{diff.label}</span>
                {filters.difficulties.includes(diff.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-current"
                  />
                )}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Play Time Filter */}
        <FilterSection title="Time Available">
          <div className="space-y-1.5">
            {playTimes.map((time) => (
              <button
                key={time.id}
                onClick={() => toggleArrayFilter('playTimes', time.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-all duration-200 ${
                  filters.playTimes.includes(time.id)
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]'
                }`}
              >
                <div className="flex flex-col items-start">
                  <span>{time.label}</span>
                  <span className="text-xs text-[#A0A0A0]">{time.description}</span>
                </div>
                {filters.playTimes.includes(time.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Play Style Filter */}
        <FilterSection title="Play Style">
          <div className="flex flex-wrap gap-1.5">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => toggleArrayFilter('modes', mode.id)}
                className={`px-3 py-1.5 rounded text-xs transition-all duration-200 ${
                  filters.modes.includes(mode.id)
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Active Filters Summary */}
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-2 space-y-2"
          >
            <div className="h-px bg-[#1E1E1E]" />
            <div className="text-xs text-[#A0A0A0]">
              Showing games matching {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
