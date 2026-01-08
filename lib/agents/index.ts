/**
 * OpenAI Agents SDK Integration for Gaming Recommendation App
 *
 * This module provides AI-powered game recommendations based on Steam user profiles.
 * It uses the OpenAI Agents SDK to analyze gaming history, preferences, and patterns
 * to generate personalized game suggestions.
 *
 * @example
 * ```typescript
 * import { generateRecommendations, analyzeUserProfile } from '@/lib/agents';
 *
 * // Generate recommendations for a Steam user
 * const result = await generateRecommendations('76561198012345678', {
 *   count: 10,
 *   filters: {
 *     genres: ['Action', 'RPG'],
 *     modes: ['solo', 'coop'],
 *     difficulties: ['moderate', 'challenging'],
 *   },
 * });
 *
 * // Just analyze user profile without recommendations
 * const profile = await analyzeUserProfile('76561198012345678');
 * ```
 */

export {
  // Main agent
  recommendationAgent,

  // Runner functions
  generateRecommendations,
  streamRecommendations,
  analyzeUserProfile,

  // Types
  type UserGamingProfile,
  type GameRecommendation,
  type RecommendationFilters,
  type RecommendationResult,
} from './recommendation-agent';
