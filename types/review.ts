export type ReviewReaction = 'like' | 'dislike';

export interface Review {
  gameId: string;
  gameTitle: string;
  reaction: ReviewReaction;
  reasons: string[]; // empty for like
  detailsText?: string; // optional
  createdAt: string; // ISO string
}

export const DISLIKE_REASONS = [
  'Not my type of game',
  '😴 Too boring / slow',
  '🤯 Too complicated',
  '🎮 Gameplay didn\'t feel fun',
  '🎨 Didn\'t like the art / style',
  '🕒 Too long / too short',
  '👥 Not good for the people I play with',
  '❌ Already played / very similar to another game',
  '🤷 Just not what I was looking for',
] as const;
