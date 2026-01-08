import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { generateRecommendations, RecommendationFilters } from '@/lib/agents';

// Helper to build a prompt from filters when no query is provided
function buildFilterPrompt(filters: RecommendationFilters): string {
  const parts: string[] = [];

  if (filters.genres && filters.genres.length > 0) {
    parts.push(`genres: ${filters.genres.join(', ')}`);
  }
  if (filters.difficulties && filters.difficulties.length > 0) {
    parts.push(`difficulty levels: ${filters.difficulties.join(', ')}`);
  }
  if (filters.playTimes && filters.playTimes.length > 0) {
    const timeDescriptions = filters.playTimes.map((t) => {
      switch (t) {
        case 'short':
          return 'quick sessions (under 2 hours)';
        case 'medium':
          return 'medium sessions (2-4 hours)';
        case 'long':
          return 'long sessions (4+ hours)';
        default:
          return t;
      }
    });
    parts.push(`play time: ${timeDescriptions.join(', ')}`);
  }
  if (filters.modes && filters.modes.length > 0) {
    parts.push(`play styles: ${filters.modes.join(', ')}`);
  }

  if (parts.length === 0) {
    return 'Recommend games based on my gaming profile and preferences';
  }

  return `Find games that match these criteria: ${parts.join('; ')}. Prioritize games that match all the specified filters.`;
}

export async function POST(request: Request) {
  try {
    // Get user session
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in with Steam.' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { query, filters } = body as {
      query?: string;
      filters?: RecommendationFilters;
    };

    // Validate: either query or filters must be provided
    const hasFilters =
      filters &&
      ((filters.genres && filters.genres.length > 0) ||
        (filters.difficulties && filters.difficulties.length > 0) ||
        (filters.playTimes && filters.playTimes.length > 0) ||
        (filters.modes && filters.modes.length > 0));

    if (!query && !hasFilters) {
      return NextResponse.json(
        { error: 'Either a query or filters must be provided' },
        { status: 400 }
      );
    }

    // Build the prompt: use query if provided, otherwise build from filters
    const customPrompt = query || (hasFilters ? buildFilterPrompt(filters!) : undefined);

    // Generate recommendations using the AI agent
    const result = await generateRecommendations(session.steamId, {
      count: 10,
      filters,
      customPrompt,
    });

    return NextResponse.json({
      recommendations: result.recommendations,
      userProfile: result.userProfile,
    });
  } catch (error) {
    console.error('AI Search error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate recommendations',
      },
      { status: 500 }
    );
  }
}
