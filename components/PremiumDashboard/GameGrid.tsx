'use client';

import { GameCard } from './GameCard';

interface Game {
  appId: number;
  name: string;
  logoUrl: string;
  iconUrl: string;
  playtimeForever: number;
  playtime2Weeks?: number;
}

interface GameGridProps {
  games: Game[];
  title?: string;
}

export function GameGrid({ games, title = 'Recommended' }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-white/90 text-2xl font-medium mb-6 tracking-tight">{title}</h2>
        <p className="text-[#B5B5B5]">No games found.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-white/90 text-2xl font-medium mb-6 tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.appId}
            appId={game.appId}
            name={game.name}
            logoUrl={game.logoUrl}
            iconUrl={game.iconUrl}
            playtimeForever={game.playtimeForever}
            playtime2Weeks={game.playtime2Weeks}
          />
        ))}
      </div>
    </div>
  );
}

