import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { createSupabaseServerClient } from '@/lib/supabase';
import { Review } from '@/types/review';

// Save a review
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { gameId, gameTitle, reaction, reasons = [], detailsText } = body;

    if (!gameId || !gameTitle || !reaction) {
      return NextResponse.json(
        { error: 'Missing required fields: gameId, gameTitle, reaction' },
        { status: 400 }
      );
    }

    if (reaction !== 'like' && reaction !== 'dislike') {
      return NextResponse.json(
        { error: 'Invalid reaction. Must be "like" or "dislike"' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    // Upsert review (replace if exists)
    const { data, error } = await supabase
      .from('reviews')
      .upsert(
        {
          steam_id: session.steamId,
          game_id: gameId,
          game_title: gameTitle,
          reaction,
          reasons: reasons || [],
          details_text: detailsText || null,
        },
        {
          onConflict: 'steam_id,game_id',
        }
      )
      .select()
      .single();

    if (error) {
      console.error('Error saving review to Supabase:', error);
      return NextResponse.json(
        { error: `Failed to save review: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, review: data });
  } catch (error) {
    console.error('Error in POST /api/reviews:', error);
    return NextResponse.json(
      { error: 'Failed to save review' },
      { status: 500 }
    );
  }
}

// Get user's reviews
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const since = searchParams.get('since'); // Optional: get reviews since a certain date

    const supabase = createSupabaseServerClient();

    let query = supabase
      .from('reviews')
      .select('*')
      .eq('steam_id', session.steamId)
      .order('created_at', { ascending: false });

    if (since) {
      query = query.gte('created_at', since);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching reviews from Supabase:', error);
      return NextResponse.json(
        { error: `Failed to fetch reviews: ${error.message}` },
        { status: 500 }
      );
    }

    // Convert database rows to Review interface
    const reviews: Review[] = (data || []).map((row: any) => ({
      gameId: row.game_id,
      gameTitle: row.game_title,
      reaction: row.reaction as 'like' | 'dislike',
      reasons: row.reasons || [],
      detailsText: row.details_text || undefined,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error in GET /api/reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

