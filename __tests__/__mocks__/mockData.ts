import type { Recommendation } from '@/components/Recommendations/RecommendationCard';
import type { Filters } from '@/components/Recommendations/FilterPanel';

export const mockRecommendation: Recommendation = {
  name: 'Hades',
  image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg',
  similarity: 95,
  genre: 'Action Roguelike',
  mode: 'solo',
  difficulty: 'challenging',
  playTime: 'medium',
  releaseDate: '2020-09-17',
  description: 'Based on your 200+ hours in roguelikes and love for fast-paced combat, Hades perfectly matches your playstyle.',
  tags: ['Roguelike', 'Singleplayer', 'Dungeon Crawler', 'Procedural Generation', 'Top-Down', 'Fast-Paced', 'Mythology', 'Challenging'],
};

export const mockRecommendations: Recommendation[] = [
  mockRecommendation,
  {
    name: 'Deep Rock Galactic',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/548430/header.jpg',
    similarity: 91,
    genre: 'Co-op Shooter',
    mode: 'coop',
    difficulty: 'moderate',
    playTime: 'medium',
    releaseDate: '2020-05-13',
    description: 'Your co-op gaming sessions with friends make Deep Rock Galactic a perfect fit.',
    tags: ['Co-op', 'FPS', 'Procedural Generation', 'Dwarves'],
  },
  {
    name: "Baldur's Gate 3",
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
    similarity: 88,
    genre: 'CRPG',
    mode: 'multiplayer',
    difficulty: 'moderate',
    playTime: 'long',
    releaseDate: '2023-08-03',
    description: 'Your extensive playtime in RPGs suggests you will love BG3.',
    tags: ['Story Rich', 'Turn-Based Combat', 'Fantasy', 'Choices Matter'],
  },
  {
    name: 'Hollow Knight',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg',
    similarity: 86,
    genre: 'Metroidvania',
    mode: 'solo',
    difficulty: 'challenging',
    playTime: 'long',
    releaseDate: '2017-02-24',
    description: 'Your appreciation for atmospheric exploration makes Hollow Knight ideal.',
    tags: ['Metroidvania', 'Souls-like', 'Exploration', 'Atmospheric'],
  },
  {
    name: 'Apex Legends',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg',
    similarity: 83,
    genre: 'Battle Royale Shooter',
    mode: 'multiplayer',
    difficulty: 'moderate',
    playTime: 'short',
    releaseDate: '2019-02-04',
    description: 'Your competitive FPS history indicates Apex would suit your playstyle.',
    tags: ['Battle Royale', 'FPS', 'Competitive', 'Fast-Paced'],
  },
  {
    name: 'Stardew Valley',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg',
    similarity: 79,
    genre: 'Simulation RPG',
    mode: 'solo',
    difficulty: 'casual',
    playTime: 'long',
    releaseDate: '2016-02-26',
    description: 'Your late-night gaming sessions suggest Stardew Valley as a perfect wind-down game.',
    tags: ['Farming', 'Life Sim', 'Relaxing', 'Pixel Art'],
  },
];

export const mockEmptyFilters: Filters = {
  genres: [],
  difficulties: [],
  playTimes: [],
  modes: [],
  sortBy: 'similarity',
};

export const mockActiveFilters: Filters = {
  genres: ['Action Roguelike', 'CRPG'],
  difficulties: ['challenging', 'moderate'],
  playTimes: ['medium', 'long'],
  modes: ['solo', 'coop'],
  sortBy: 'similarity',
};

export const mockApiResponse = {
  recommendations: mockRecommendations,
  userProfile: {
    steamId: '12345678',
    totalGames: 150,
    totalPlaytime: 2500,
    topGames: ['Counter-Strike 2', 'Dota 2', 'Hades'],
    recentGames: ['Elden Ring', 'Baldur\'s Gate 3'],
  },
};

export const mockSession = {
  steamId: '12345678',
  username: 'TestUser',
  avatar: 'https://avatars.steamstatic.com/test.jpg',
};

export const createMockRecommendation = (overrides: Partial<Recommendation> = {}): Recommendation => ({
  ...mockRecommendation,
  ...overrides,
});

export const createMockFilters = (overrides: Partial<Filters> = {}): Filters => ({
  ...mockEmptyFilters,
  ...overrides,
});
