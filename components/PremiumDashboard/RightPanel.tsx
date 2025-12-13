'use client';

import { useState } from 'react';

export function RightPanel() {
  const [timeAvailable, setTimeAvailable] = useState(4);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const genres = ['Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Sports'];

  return (
    <div className="fixed right-0 top-0 h-full w-72 flex flex-col py-8 px-6 border-l border-[#1E1E1E] bg-[#0D0D0D]/80 backdrop-blur-sm z-20 overflow-y-auto">
      <h2 className="text-white/90 text-lg font-medium mb-6">Quick Filters</h2>

      {/* Time Available Slider */}
      <div className="mb-8">
        <label className="text-[#B5B5B5] text-sm mb-2 block">
          Time Available: {timeAvailable}h
        </label>
        <input
          type="range"
          min="1"
          max="8"
          value={timeAvailable}
          onChange={(e) => setTimeAvailable(Number(e.target.value))}
          className="w-full h-2 bg-[#1E1E1E] rounded-lg appearance-none cursor-pointer accent-white/20"
        />
        <div className="flex justify-between text-[#A0A0A0] text-xs mt-1">
          <span>1h</span>
          <span>8h</span>
        </div>
      </div>

      {/* Find Similar To */}
      <div className="mb-8">
        <label className="text-[#B5B5B5] text-sm mb-2 block">Find Similar to...</label>
        <select className="w-full bg-[#141414] border border-[#1E1E1E] rounded px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-[#2A2A2A]">
          <option>Select a game</option>
        </select>
      </div>

      {/* Genre Filters */}
      <div>
        <label className="text-[#B5B5B5] text-sm mb-3 block">Genre</label>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                selectedGenre === genre
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-[#141414] text-[#B5B5B5] border border-[#1E1E1E] hover:border-[#2A2A2A]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

