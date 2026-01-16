import { Agent, tool, run } from '@openai/agents';
import { z } from 'zod';
import { getOwnedGames, getRecentlyPlayedGames, calculateTotalPlaytime } from '../steam-api';
import { Review } from '@/types/review';
import { createSupabaseServerClient } from '../supabase';

// ============================================================================
// Type Definitions
// ============================================================================

export interface UserGamingProfile {
  steamId: string;
  totalGames: number;
  totalPlaytimeHours: number;
  topGamesByPlaytime: Array<{
    name: string;
    playtimeHours: number;
  }>;
  recentGames: Array<{
    name: string;
    playtimeLastTwoWeeks: number;
  }>;
}

export interface GameRecommendation {
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

export interface RecommendationFilters {
  genres?: string[];
  modes?: ('solo' | 'coop' | 'multiplayer')[];
  difficulties?: ('casual' | 'moderate' | 'challenging')[];
  playTimes?: ('short' | 'medium' | 'long')[];
  excludeOwned?: boolean;
}

export interface RecommendationResult {
  recommendations: GameRecommendation[];
  userProfile: UserGamingProfile;
}

// ============================================================================
// System Prompt
// ============================================================================

const SYSTEM_PROMPT = `You are an expert gaming recommendation AI assistant. You analyze Steam gaming profiles and suggest personalized game recommendations using your extensive knowledge of video games.

## Your Role
You analyze users' gaming history and playtime patterns to recommend games they'll love. You use your knowledge of games to understand what genres and styles they enjoy based on the games they play.

## Your Capabilities
1. **Profile Analysis**: Examine a user's owned games, playtime distribution, and recent gaming activity
2. **Pattern Recognition**: Identify preferred genres and gameplay styles based on game names you recognize
3. **Smart Recommendations**: Suggest games that match user preferences while introducing variety
4. **Personalized Explanations**: Provide context for why each game is recommended

## Recommendation Guidelines

### Similarity Scoring (0-100)
- **95-100**: Perfect match - aligns with top-played game styles
- **85-94**: Excellent match - matches core preferences with slight variety
- **75-84**: Great match - introduces new elements within comfort zone
- **65-74**: Good match - expands horizons while respecting preferences
- **Below 65**: Only suggest if specifically requested or highly acclaimed

### Game Mode Classification
- **solo**: Single-player focused games
- **coop**: Cooperative multiplayer (PvE focused)
- **multiplayer**: Competitive or mixed online modes

### Difficulty Assessment
- **casual**: Relaxing, low-stress gameplay
- **moderate**: Balanced challenge, fair learning curve
- **challenging**: High skill ceiling, punishing mechanics

### Play Time Per Session
- **short**: 15-45 minutes per session
- **medium**: 1-3 hours per session
- **long**: 3+ hours, campaign-focused or endless

## Response Format
When generating recommendations, provide them as a structured JSON array with the following fields for each game:
- name: Game title (exact Steam store name)
- image: Use format "https://cdn.cloudflare.steamstatic.com/steam/apps/{STEAM_APP_ID}/header.jpg" - use the real Steam App ID
- similarity: 0-100 score based on profile match
- genre: Primary genre classification
- mode: "solo", "coop", or "multiplayer"
- difficulty: "casual", "moderate", or "challenging"
- playTime: "short", "medium", or "long"
- releaseDate: ISO date string (YYYY-MM-DD)
- description: 2-3 sentences explaining why this game matches the user's profile
- tags: Array of 6-8 relevant tags

## Important Notes
- Use your knowledge of games to understand what the user likes based on their play history
- Always use real Steam App IDs for image URLs
- Prioritize quality over quantity in recommendations
- Consider both popular and hidden gem games
- Respect user filters when provided
- Exclude games the user already owns unless asked otherwise`;

// ============================================================================
// Agent Tools
// ============================================================================

/**
 * Tool to fetch a user's Steam gaming profile
 */
const getUserGamingProfile = tool({
  name: 'get_user_gaming_profile',
  description: 'Fetches a Steam user\'s gaming profile including owned games, playtime, and recent activity.',
  parameters: z.object({
    steamId: z.string().describe('The Steam ID of the user to analyze'),
    topGamesCount: z.number().optional().default(20).describe('Number of top games by playtime to return (default: 20)'),
  }),
  async execute({ steamId, topGamesCount = 20 }) {
    try {
      // Fetch owned games and recent games in parallel
      const [ownedGames, recentGames] = await Promise.all([
        getOwnedGames(steamId),
        getRecentlyPlayedGames(steamId),
      ]);

      if (ownedGames.length === 0) {
        return {
          error: 'No games found for this Steam profile. The profile may be private or have no games.',
          steamId,
        };
      }

      // Sort by playtime and get top games
      const sortedByPlaytime = [...ownedGames].sort(
        (a, b) => b.playtime_forever - a.playtime_forever
      );
      const topGames = sortedByPlaytime.slice(0, topGamesCount);

      const profile: UserGamingProfile = {
        steamId,
        totalGames: ownedGames.length,
        totalPlaytimeHours: calculateTotalPlaytime(ownedGames),
        topGamesByPlaytime: topGames.map(g => ({
          name: g.name,
          playtimeHours: Math.round(g.playtime_forever / 60 * 10) / 10,
        })),
        recentGames: recentGames.map(g => ({
          name: g.name,
          playtimeLastTwoWeeks: Math.round(g.playtime_2weeks / 60 * 10) / 10,
        })),
      };

      return profile;
    } catch (error) {
      console.error('Error fetching user gaming profile:', error);
      return {
        error: `Failed to fetch gaming profile: ${error instanceof Error ? error.message : 'Unknown error'}`,
        steamId,
      };
    }
  },
});

/**
 * Tool to get list of user's owned game names (for exclusion)
 */
const getUserOwnedGameNames = tool({
  name: 'get_user_owned_game_names',
  description: 'Gets a list of all game names owned by the user. Useful for excluding already-owned games from recommendations.',
  parameters: z.object({
    steamId: z.string().describe('The Steam ID of the user'),
  }),
  async execute({ steamId }) {
    try {
      const ownedGames = await getOwnedGames(steamId);
      return {
        count: ownedGames.length,
        games: ownedGames.map(g => g.name.toLowerCase()),
      };
    } catch (error) {
      console.error('Error fetching owned games:', error);
      return {
        error: `Failed to fetch owned games: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  },
});

// ============================================================================
// Agent Configuration
// ============================================================================

/**
 * Main Recommendation Agent
 * Analyzes user gaming profiles and generates personalized game recommendations
 */
export const recommendationAgent = new Agent({
  name: 'Gaming Recommendation Agent',
  instructions: SYSTEM_PROMPT,
  model: 'gpt-4o',
  tools: [getUserGamingProfile, getUserOwnedGameNames],
});

// ============================================================================
// Agent Runner Functions
// ============================================================================

/**
 * Generate game recommendations for a user based on their Steam profile
 */
// Helper function to fetch user reviews directly from Supabase
async function fetchUserReviews(steamId: string, since?: string): Promise<Review[]> {
  try {
    const supabase = createSupabaseServerClient();
    
    let query = supabase
      .from('reviews')
      .select('*')
      .eq('steam_id', steamId)
      .order('created_at', { ascending: false });

    if (since) {
      query = query.gte('created_at', since);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching reviews from Supabase:', error);
      return [];
    }

    // Convert database rows to Review interface
    return (data || []).map((row: any) => ({
      gameId: row.game_id,
      gameTitle: row.game_title,
      reaction: row.reaction as 'like' | 'dislike',
      reasons: row.reasons || [],
      detailsText: row.details_text || undefined,
      createdAt: row.created_at,
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

// Helper function to analyze reviews and extract preferences with detailed context
function analyzeReviewsForPreferences(reviews: Review[]): { context: string; reviewDetails: Array<{ game: string; reaction: string; reasons: string[]; details?: string }> } {
  if (reviews.length === 0) {
    return { context: '', reviewDetails: [] };
  }

  const recentReviews = reviews
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10); // Last 10 reviews

  const preferences: string[] = [];
  const dislikes: Array<{ game: string; reasons: string[]; details?: string }> = [];
  const likes: string[] = [];
  const reviewDetails: Array<{ game: string; reaction: string; reasons: string[]; details?: string }> = [];

  for (const review of recentReviews) {
    reviewDetails.push({
      game: review.gameTitle,
      reaction: review.reaction,
      reasons: review.reasons || [],
      details: review.detailsText,
    });

    if (review.reaction === 'like') {
      likes.push(review.gameTitle);
    } else {
      dislikes.push({
        game: review.gameTitle,
        reasons: review.reasons || [],
        details: review.detailsText,
      });
      
      // Analyze dislike reasons
      for (const reason of review.reasons) {
        if (reason.includes('Too complicated') || reason.includes('Too hard')) {
          preferences.push(`User found "${review.gameTitle}" too complicated/challenging - prefer less challenging games`);
        }
        if (reason.includes('Too long') || reason.includes('too short')) {
          if (reason.includes('Too long')) {
            preferences.push(`User found "${review.gameTitle}" too long - prefer shorter games`);
          } else {
            preferences.push(`User found "${review.gameTitle}" too short - prefer longer games`);
          }
        }
        if (reason.includes('Too boring') || reason.includes('slow')) {
          preferences.push(`User found "${review.gameTitle}" too boring/slow - prefer more engaging/faster-paced games`);
        }
        if (reason.includes('Not my type')) {
          preferences.push(`User didn't like the type/style of "${review.gameTitle}" - avoid similar styles`);
        }
      }
      
      // Check details text for additional insights
      if (review.detailsText) {
        const details = review.detailsText.toLowerCase();
        if (details.includes('too hard') || details.includes('difficult') || details.includes('challenging')) {
          preferences.push(`User found "${review.gameTitle}" too difficult - prefer easier games`);
        }
        if (details.includes('too long') || details.includes('lengthy')) {
          preferences.push(`User found "${review.gameTitle}" too long - prefer shorter games`);
        }
        if (details.includes('too short') || details.includes('brief')) {
          preferences.push(`User found "${review.gameTitle}" too short - prefer longer games`);
        }
      }
    }
  }

  let reviewContext = '';
  
  if (likes.length > 0) {
    reviewContext += `\n\nUser LIKED these games: ${likes.join(', ')}. Consider recommending similar games and mention this in the description.`;
  }
  
  if (dislikes.length > 0) {
    reviewContext += `\n\nUser DISLIKED these games with specific feedback:\n`;
    for (const dislike of dislikes) {
      reviewContext += `- "${dislike.game}": ${dislike.reasons.join(', ')}${dislike.details ? ` (Additional: ${dislike.details})` : ''}\n`;
    }
    reviewContext += `\nAvoid recommending similar games and ensure recommendations address the issues mentioned.`;
  }
  
  if (preferences.length > 0) {
    const uniquePreferences = [...new Set(preferences)];
    reviewContext += `\n\nBased on user reviews, apply these preferences:\n${uniquePreferences.map(p => `- ${p}`).join('\n')}`;
  }

  return { context: reviewContext, reviewDetails };
}

export async function generateRecommendations(
  steamId: string,
  options: {
    count?: number;
    filters?: RecommendationFilters;
    customPrompt?: string;
    lastRecommendationTime?: string; // ISO timestamp of last recommendation generation
  } = {}
): Promise<RecommendationResult & { reviewMessages?: Array<{ gameName: string; message: string }> }> {
  const { count = 10, filters, customPrompt, lastRecommendationTime } = options;

  // Fetch user reviews (only since last recommendation if provided)
  const relevantReviews = await fetchUserReviews(steamId, lastRecommendationTime);

  // Analyze reviews for preferences and context
  const { context: reviewContext, reviewDetails } = analyzeReviewsForPreferences(relevantReviews);

  // Build the user prompt
  let userPrompt = `Analyze the Steam profile for user ID: ${steamId}

Generate ${count} personalized game recommendations based on their gaming history and preferences.`;

  if (filters) {
    const filterParts: string[] = [];

    if (filters.genres?.length) {
      filterParts.push(`- Focus on genres: ${filters.genres.join(', ')}`);
    }
    if (filters.modes?.length) {
      filterParts.push(`- Game modes: ${filters.modes.join(', ')}`);
    }
    if (filters.difficulties?.length) {
      filterParts.push(`- Difficulty levels: ${filters.difficulties.join(', ')}`);
    }
    if (filters.playTimes?.length) {
      filterParts.push(`- Session lengths: ${filters.playTimes.join(', ')}`);
    }
    if (filters.excludeOwned !== false) {
      filterParts.push('- Exclude games the user already owns');
    }

    if (filterParts.length > 0) {
      userPrompt += `\n\nApply these filters:\n${filterParts.join('\n')}`;
    }
  }

  // Add review-based preferences and detailed review information
  if (reviewContext) {
    userPrompt += reviewContext;
    
    // Add detailed review information for reference in descriptions
    if (reviewDetails.length > 0) {
      userPrompt += `\n\nIMPORTANT: When writing the "description" field for each recommendation, you MUST reference the specific games the user reviewed and explain how your recommendation addresses their feedback. For example:
- If user disliked "Game X" for being too hard, mention: "Based on your review of Game X where you found it too challenging, this game offers a more accessible difficulty..."
- If user liked "Game Y", mention: "Similar to Game Y which you enjoyed, this game features..."
- Always be specific about which game(s) influenced the recommendation and why.

Recent reviews to reference in descriptions:
${reviewDetails.map(r => `- ${r.reaction === 'like' ? 'LIKED' : 'DISLIKED'}: "${r.game}"${r.reasons.length > 0 ? ` (Reasons: ${r.reasons.join(', ')})` : ''}${r.details ? ` (Details: ${r.details})` : ''}`).join('\n')}`;
    }
  }

  if (customPrompt) {
    userPrompt += `\n\nAdditional context: ${customPrompt}`;
  }

  userPrompt += `

Return your response as a valid JSON object with three fields:
1. "userProfile": Summary of the analyzed user profile (steamId, totalGames, totalPlaytimeHours, topGamesByPlaytime, recentGames)
2. "recommendations": Array of ${count} game recommendations
3. "reviewMessages": Array of personalized messages explaining why each recommendation was made based on user reviews (optional, only include if reviews influenced the recommendation)

Each recommendation must follow this exact structure:
{
  "name": "Game Title",
  "image": "https://cdn.cloudflare.steamstatic.com/steam/apps/{STEAM_APP_ID}/header.jpg",
  "similarity": 85,
  "genre": "Primary Genre",
  "mode": "solo|coop|multiplayer",
  "difficulty": "casual|moderate|challenging",
  "playTime": "short|medium|long",
  "releaseDate": "YYYY-MM-DD",
  "description": "Personalized explanation of why this game is recommended. MUST reference specific games the user reviewed (if any) and explain how this recommendation addresses their feedback. For example: 'Based on your review of [Game Name] where you mentioned [feedback], this game [addresses that concern]...'",
  "tags": ["Tag1", "Tag2", "Tag3", ...]
}

Each review message (if provided) should follow this structure:
{
  "gameName": "Game Title",
  "message": "Based on your review of [Game], we recommend this game as it is [reason based on review - e.g., 'less challenging', 'shorter', 'more engaging', etc.]"
}

IMPORTANT: 
- Use real Steam App IDs for the image URLs. Do not use placeholder IDs.
- If reviews influenced recommendations, include personalized messages explaining the connection.
- Messages should reference specific games the user reviewed and explain how the recommendation addresses their feedback.`;

  try {
    const result = await run(recommendationAgent, userPrompt);

    // Parse the agent's response
    const output = result.finalOutput;

    if (!output) {
      throw new Error('No output received from recommendation agent');
    }

    // Extract JSON from the response (handle markdown code blocks)
    let jsonString = output;
    const jsonMatch = output.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1].trim();
    }

    const parsed = JSON.parse(jsonString);

    return {
      recommendations: parsed.recommendations || [],
      userProfile: parsed.userProfile || {
        steamId,
        totalGames: 0,
        totalPlaytimeHours: 0,
        topGamesByPlaytime: [],
        recentGames: [],
      },
      reviewMessages: parsed.reviewMessages || [],
    };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw new Error(
      `Failed to generate recommendations: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Stream game recommendations for a user (for real-time UI updates)
 */
export async function streamRecommendations(
  steamId: string,
  options: {
    count?: number;
    filters?: RecommendationFilters;
    customPrompt?: string;
  } = {}
) {
  const { count = 10, filters, customPrompt } = options;

  let userPrompt = `Analyze the Steam profile for user ID: ${steamId}

Generate ${count} personalized game recommendations based on their gaming history.`;

  if (filters) {
    const filterParts: string[] = [];

    if (filters.genres?.length) {
      filterParts.push(`- Genres: ${filters.genres.join(', ')}`);
    }
    if (filters.modes?.length) {
      filterParts.push(`- Modes: ${filters.modes.join(', ')}`);
    }
    if (filters.difficulties?.length) {
      filterParts.push(`- Difficulties: ${filters.difficulties.join(', ')}`);
    }
    if (filters.playTimes?.length) {
      filterParts.push(`- Play times: ${filters.playTimes.join(', ')}`);
    }

    if (filterParts.length > 0) {
      userPrompt += `\n\nFilters:\n${filterParts.join('\n')}`;
    }
  }

  if (customPrompt) {
    userPrompt += `\n\n${customPrompt}`;
  }

  // Return streaming result
  const streamResult = await run(recommendationAgent, userPrompt, { stream: true });
  return streamResult;
}

/**
 * Get a quick analysis of a user's gaming profile without recommendations
 */
export async function analyzeUserProfile(steamId: string): Promise<UserGamingProfile> {
  const userPrompt = `Analyze the Steam profile for user ID: ${steamId}

Provide a detailed analysis of their gaming preferences without generating recommendations.
Return the user profile data as a JSON object with these fields:
- steamId
- totalGames
- totalPlaytimeHours
- topGamesByPlaytime (array with name, playtimeHours)
- recentGames (array with name, playtimeLastTwoWeeks)`;

  try {
    const result = await run(recommendationAgent, userPrompt);

    if (!result.finalOutput) {
      throw new Error('No output received from agent');
    }

    let jsonString = result.finalOutput;
    const jsonMatch = result.finalOutput.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1].trim();
    }

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error analyzing user profile:', error);
    throw new Error(
      `Failed to analyze profile: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
