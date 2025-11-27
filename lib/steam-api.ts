import axios, { AxiosError } from 'axios';

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_API_BASE = 'https://api.steampowered.com';

export interface SteamPlayerSummary {
  steamid: string;
  personaname: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  personastate: number;
  communityvisibilitystate: number;
}

export interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
  playtime_2weeks?: number;
}

export interface SteamRecentGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
}

// Validate API key
function validateApiKey(): void {
  if (!STEAM_API_KEY) {
    throw new Error('STEAM_API_KEY is not configured in environment variables');
  }
}

// Generic Steam API request handler
async function steamApiRequest<T>(endpoint: string, params: Record<string, string | number>): Promise<T> {
  validateApiKey();
  
  try {
    const response = await axios.get<T>(`${STEAM_API_BASE}${endpoint}`, {
      params: {
        key: STEAM_API_KEY,
        ...params,
      },
      timeout: 10000, // 10 second timeout
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(`Steam API error (${endpoint}):`, axiosError.response?.status, axiosError.message);
    }
    throw error;
  }
}

// Get player summary (avatar, name, etc.)
export async function getPlayerSummary(steamId: string): Promise<SteamPlayerSummary | null> {
  try {
    interface Response {
      response: {
        players: SteamPlayerSummary[];
      };
    }

    const data = await steamApiRequest<Response>(
      '/ISteamUser/GetPlayerSummaries/v0002/',
      { steamids: steamId }
    );

    return data.response?.players?.[0] || null;
  } catch (error) {
    console.error('Error fetching player summary:', error);
    return null;
  }
}

// Get owned games
export async function getOwnedGames(steamId: string): Promise<SteamGame[]> {
  try {
    interface Response {
      response: {
        games?: SteamGame[];
      };
    }

    const data = await steamApiRequest<Response>(
      '/IPlayerService/GetOwnedGames/v0001/',
      {
        steamid: steamId,
        include_appinfo: 1,
        include_played_free_games: 1,
      }
    );

    return data.response?.games || [];
  } catch (error) {
    console.error('Error fetching owned games:', error);
    return [];
  }
}

// Get recently played games
export async function getRecentlyPlayedGames(steamId: string): Promise<SteamRecentGame[]> {
  try {
    interface Response {
      response: {
        games?: SteamRecentGame[];
      };
    }

    const data = await steamApiRequest<Response>(
      '/IPlayerService/GetRecentlyPlayedGames/v0001/',
      {
        steamid: steamId,
        count: 10,
      }
    );

    return data.response?.games || [];
  } catch (error) {
    console.error('Error fetching recently played games:', error);
    return [];
  }
}

// Calculate total playtime in hours
export function calculateTotalPlaytime(games: SteamGame[]): number {
  const totalMinutes = games.reduce((total, game) => total + game.playtime_forever, 0);
  return Math.round((totalMinutes / 60) * 10) / 10; // Round to 1 decimal
}

