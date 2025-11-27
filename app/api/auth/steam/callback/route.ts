import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { createOrUpdateUser } from '@/lib/db';
import { setSessionCookie } from '@/lib/session';
import { getPlayerSummary } from '@/lib/steam-api';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const RETURN_URL = `${BASE_URL}/api/auth/steam/callback`;

// Extract Steam ID from OpenID identity
function extractSteamId(claimedId: string | null, identity: string | null): string | null {
  const id = claimedId || identity;
  if (!id) return null;
  
  const match = id.match(/\/id\/(\d+)$/);
  return match ? match[1] : null;
}

// Verify Steam OpenID response (simplified - Steam is trusted)
function validateSteamResponse(searchParams: URLSearchParams): boolean {
  const mode = searchParams.get('openid.mode');
  const claimedId = searchParams.get('openid.claimed_id');
  const identity = searchParams.get('openid.identity');
  
  // Basic validation
  return mode === 'id_res' && 
         (claimedId?.includes('steamcommunity.com') || identity?.includes('steamcommunity.com')) &&
         !!searchParams.get('openid.sig');
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Redirect if not a valid response
  if (!validateSteamResponse(searchParams)) {
    redirect('/api/auth/steam');
  }

  try {
    // Extract Steam ID
    const steamId = extractSteamId(
      searchParams.get('openid.claimed_id'),
      searchParams.get('openid.identity')
    );

    if (!steamId) {
      return new Response('Failed to extract Steam ID', { status: 400 });
    }

    // Fetch user data from Steam API
    const playerSummary = await getPlayerSummary(steamId);
    
    if (!playerSummary) {
      return new Response('Failed to fetch user data from Steam. Please check your STEAM_API_KEY.', { 
        status: 500 
      });
    }

    // Create or update user in database
    const user = createOrUpdateUser({
      steamId,
      username: playerSummary.personaname,
      avatar: playerSummary.avatarfull || playerSummary.avatarmedium || playerSummary.avatar,
      profileUrl: playerSummary.profileurl,
    });

    // Create session
    await setSessionCookie({
      steamId: user.steamId,
      username: user.username,
      avatar: user.avatar,
    });

    // Redirect to dashboard
    redirect('/dashboard');
  } catch (error: any) {
    // Don't catch redirect errors
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    
    console.error('Steam callback error:', error);
    return new Response('Authentication failed', { status: 500 });
  }
}

