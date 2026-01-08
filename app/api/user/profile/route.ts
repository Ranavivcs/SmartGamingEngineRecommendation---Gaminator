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

    const user = getUserBySteamId(session.steamId);

    if (!user) {
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
        steamId: user.steamId,
        username: user.username,
        avatar: user.avatar,
        profileUrl: user.profileUrl,
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
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}
