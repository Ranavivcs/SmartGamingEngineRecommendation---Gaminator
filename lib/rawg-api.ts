import axios, { AxiosError } from 'axios';

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAWG_API_BASE = 'https://api.rawg.io/api';

// RAWG Game response interfaces
export interface RAWGPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface RAWGGenre {
  id: number;
  name: string;
  slug: string;
}

export interface RAWGTag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
}

export interface RAWGRating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface RAWGGame {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  background_image: string | null;
  rating: number;
  rating_top: number;
  ratings: RAWGRating[];
  ratings_count: number;
  metacritic: number | null;
  playtime: number;
  genres: RAWGGenre[];
  tags: RAWGTag[];
  platforms: RAWGPlatform[];
  description_raw?: string;
  developers?: { id: number; name: string; slug: string }[];
  publishers?: { id: number; name: string; slug: string }[];
  esrb_rating?: { id: number; name: string; slug: string } | null;
}

export interface RAWGSearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RAWGGame[];
}

// Enriched game data combining Steam + RAWG
export interface EnrichedGameData {
  steamAppId: number;
  steamName: string;
  rawgData: RAWGGame | null;
  matchConfidence: 'high' | 'medium' | 'low' | 'none';
}

// Validate API key
function validateApiKey(): void {
  if (!RAWG_API_KEY) {
    throw new Error('RAWG_API_KEY is not configured in environment variables');
  }
}

// Generic RAWG API request handler (mirrors Steam API pattern)
async function rawgApiRequest<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  validateApiKey();

  try {
    const response = await axios.get<T>(`${RAWG_API_BASE}${endpoint}`, {
      params: {
        key: RAWG_API_KEY,
        ...params,
      },
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'GamingRecommendationApp/1.0',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(`RAWG API error (${endpoint}):`, axiosError.response?.status, axiosError.message);
    }
    throw error;
  }
}

// Search for a game by name
export async function searchGameByName(gameName: string): Promise<RAWGGame | null> {
  try {
    const data = await rawgApiRequest<RAWGSearchResponse>('/games', {
      search: gameName,
      page_size: 5, // Get top 5 results to find best match
    });

    if (!data.results || data.results.length === 0) {
      console.log(`[RAWG] No results found for: "${gameName}"`);
      return null;
    }

    // Find best match by comparing names
    const normalizedSearch = gameName.toLowerCase().trim();

    // First try exact match
    const exactMatch = data.results.find(
      game => game.name.toLowerCase().trim() === normalizedSearch
    );
    if (exactMatch) {
      console.log(`[RAWG] Exact match found for "${gameName}": ${exactMatch.name}`);
      return exactMatch;
    }

    // Then try starts-with match
    const startsWithMatch = data.results.find(
      game => game.name.toLowerCase().startsWith(normalizedSearch)
    );
    if (startsWithMatch) {
      console.log(`[RAWG] Partial match found for "${gameName}": ${startsWithMatch.name}`);
      return startsWithMatch;
    }

    // Fall back to first result (most relevant by RAWG ranking)
    console.log(`[RAWG] Best guess for "${gameName}": ${data.results[0].name}`);
    return data.results[0];
  } catch (error) {
    console.error(`[RAWG] Error searching for game "${gameName}":`, error);
    return null;
  }
}

// Get detailed game info by slug
export async function getGameDetails(gameSlug: string): Promise<RAWGGame | null> {
  try {
    const data = await rawgApiRequest<RAWGGame>(`/games/${gameSlug}`);
    return data;
  } catch (error) {
    console.error(`[RAWG] Error fetching game details for "${gameSlug}":`, error);
    return null;
  }
}

// Calculate match confidence between Steam name and RAWG result
function calculateMatchConfidence(steamName: string, rawgName: string): 'high' | 'medium' | 'low' {
  const normalizedSteam = steamName.toLowerCase().trim();
  const normalizedRawg = rawgName.toLowerCase().trim();

  if (normalizedSteam === normalizedRawg) {
    return 'high';
  }

  // Check if one contains the other
  if (normalizedSteam.includes(normalizedRawg) || normalizedRawg.includes(normalizedSteam)) {
    return 'medium';
  }

  // Check word overlap
  const steamWords = normalizedSteam.split(/\s+/);
  const rawgWordsSet = new Set(normalizedRawg.split(/\s+/));
  const overlap = steamWords.filter(word => rawgWordsSet.has(word)).length;

  if (overlap >= 2 || (overlap >= 1 && steamWords.length <= 2)) {
    return 'medium';
  }

  return 'low';
}

// Enrich a single game with RAWG data
export async function enrichGameWithRAWG(
  steamAppId: number,
  steamName: string
): Promise<EnrichedGameData> {
  const rawgGame = await searchGameByName(steamName);

  if (!rawgGame) {
    return {
      steamAppId,
      steamName,
      rawgData: null,
      matchConfidence: 'none',
    };
  }

  const confidence = calculateMatchConfidence(steamName, rawgGame.name);

  return {
    steamAppId,
    steamName,
    rawgData: rawgGame,
    matchConfidence: confidence,
  };
}

// Batch enrich multiple games with RAWG data
// Uses sequential requests with delay to respect rate limits
export async function enrichGamesWithRAWG(
  games: { appid: number; name: string }[],
  options: {
    maxGames?: number;
    delayMs?: number;
    logProgress?: boolean;
  } = {}
): Promise<EnrichedGameData[]> {
  const { maxGames = 10, delayMs = 200, logProgress = true } = options;

  // Limit the number of games to enrich (to avoid rate limits)
  const gamesToEnrich = games.slice(0, maxGames);
  const results: EnrichedGameData[] = [];

  if (logProgress) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`[RAWG] Starting enrichment for ${gamesToEnrich.length} games`);
    console.log(`${'='.repeat(60)}\n`);
  }

  for (let i = 0; i < gamesToEnrich.length; i++) {
    const game = gamesToEnrich[i];

    if (logProgress) {
      console.log(`[RAWG] (${i + 1}/${gamesToEnrich.length}) Processing: "${game.name}"`);
    }

    const enrichedData = await enrichGameWithRAWG(game.appid, game.name);
    results.push(enrichedData);

    // Log the enriched data
    if (logProgress && enrichedData.rawgData) {
      console.log(`  ├─ RAWG Match: "${enrichedData.rawgData.name}" (${enrichedData.matchConfidence} confidence)`);
      console.log(`  ├─ Rating: ${enrichedData.rawgData.rating}/5 (${enrichedData.rawgData.ratings_count} ratings)`);
      console.log(`  ├─ Metacritic: ${enrichedData.rawgData.metacritic ?? 'N/A'}`);
      console.log(`  ├─ Genres: ${enrichedData.rawgData.genres?.map(g => g.name).join(', ') || 'N/A'}`);
      const englishTags = enrichedData.rawgData.tags?.filter(t => t.language === 'eng').slice(0, 5).map(t => t.name);
      console.log(`  └─ Tags: ${englishTags?.join(', ') || 'N/A'}`);
      console.log('');
    } else if (logProgress) {
      console.log(`  └─ No RAWG match found\n`);
    }

    // Add delay between requests to avoid rate limiting
    if (i < gamesToEnrich.length - 1 && delayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  if (logProgress) {
    const matched = results.filter(r => r.rawgData !== null).length;
    console.log(`${'='.repeat(60)}`);
    console.log(`[RAWG] Enrichment complete: ${matched}/${results.length} games matched`);
    console.log(`${'='.repeat(60)}\n`);
  }

  return results;
}

// Helper to extract only English tags from RAWG data
export function getEnglishTags(tags: RAWGTag[] | undefined): string[] {
  if (!tags) return [];
  return tags.filter(t => t.language === 'eng').map(t => t.name);
}

// Log full RAWG response data for debugging
export function logRAWGResponse(enrichedGames: EnrichedGameData[]): void {
  console.log('\n' + '='.repeat(80));
  console.log('RAWG ENRICHMENT RESULTS - FULL DATA');
  console.log('='.repeat(80) + '\n');

  for (const game of enrichedGames) {
    console.log(`\n--- ${game.steamName} (Steam AppID: ${game.steamAppId}) ---`);
    console.log(`Match Confidence: ${game.matchConfidence}`);

    if (game.rawgData) {
      console.log('\nRAWG Data:');
      // Filter to only English tags
      const englishTags = game.rawgData.tags?.filter(t => t.language === 'eng').slice(0, 10).map(t => t.name);
      console.log(JSON.stringify({
        id: game.rawgData.id,
        slug: game.rawgData.slug,
        name: game.rawgData.name,
        released: game.rawgData.released,
        rating: game.rawgData.rating,
        rating_top: game.rawgData.rating_top,
        ratings_count: game.rawgData.ratings_count,
        metacritic: game.rawgData.metacritic,
        playtime: game.rawgData.playtime,
        genres: game.rawgData.genres?.map(g => g.name),
        tags: englishTags,
        platforms: game.rawgData.platforms?.map(p => p.platform.name),
        background_image: game.rawgData.background_image,
      }, null, 2));
    } else {
      console.log('\nNo RAWG data available');
    }
  }

  console.log('\n' + '='.repeat(80) + '\n');
}
