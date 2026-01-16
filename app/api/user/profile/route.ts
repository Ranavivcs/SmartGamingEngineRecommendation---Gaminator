import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getUserBySteamId } from '@/lib/db';
import { getOwnedGames, getRecentlyPlayedGames, calculateTotalPlaytime } from '@/lib/steam-api';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await getUserBySteamId(session.steamId);

    if (!user) {
      // User doesn't exist in Supabase yet - this can happen if they logged in before migration
      // Try to create the user from session data
      console.log('User not found in database, creating from session data...');
      try {
        const { createOrUpdateUser } = await import('@/lib/db');
        const newUser = await createOrUpdateUser({
          steamId: session.steamId,
          username: session.username,
          avatar: session.avatar,
          profileUrl: `https://steamcommunity.com/profiles/${session.steamId}`,
        });
        
        // Retry fetching the user
        const retryUser = await getUserBySteamId(session.steamId);
        if (!retryUser) {
          return NextResponse.json({ error: 'Failed to create user in database' }, { status: 500 });
        }
      } catch (createError) {
        console.error('Error creating user from session:', createError);
        return NextResponse.json(
          { error: `User not found and failed to create: ${createError instanceof Error ? createError.message : 'Unknown error'}` },
          { status: 500 }
        );
      }
    }
    
    // Get the user (either existing or newly created)
    const finalUser = user || await getUserBySteamId(session.steamId);
    if (!finalUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch Steam data in parallel for better performance
    const [ownedGames, recentGames] = await Promise.all([
      getOwnedGames(session.steamId),
      getRecentlyPlayedGames(session.steamId),
    ]);

    const totalPlaytime = calculateTotalPlaytime(ownedGames);

    return NextResponse.json({
      user: {
        steamId: finalUser.steamId,
        username: finalUser.username,
        avatar: finalUser.avatar,
        profileUrl: finalUser.profileUrl,
      },
      stats: {
        totalGames: ownedGames.length,
        totalPlaytimeHours: totalPlaytime,
      },
      recentGames: recentGames.map((game) => {
        // Use Cloudflare CDN header image as primary, fallback to icon/logo if available
        const headerUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
        const iconUrl = (game.img_icon_url && game.img_icon_url.trim() !== '')
          ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
          : headerUrl;
        const logoUrl = (game.img_logo_url && game.img_logo_url.trim() !== '')
          ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`
          : headerUrl;

        return {
          appId: game.appid,
          name: game.name,
          playtime2Weeks: game.playtime_2weeks,
          playtimeForever: game.playtime_forever,
          iconUrl,
          logoUrl,
        };
      }),
      ownedGames: ownedGames.map((game) => {
        // Use Cloudflare CDN header image as primary, fallback to icon/logo if available
        const headerUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
        const iconUrl = (game.img_icon_url && game.img_icon_url.trim() !== '')
          ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
          : headerUrl;
        const logoUrl = (game.img_logo_url && game.img_logo_url.trim() !== '')
          ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`
          : headerUrl;

        return {
          appId: game.appid,
          name: game.name,
          playtimeForever: game.playtime_forever,
          playtime2Weeks: game.playtime_2weeks || 0,
          iconUrl,
          logoUrl,
        };
      }),
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user profile';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
