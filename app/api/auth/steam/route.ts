import { redirect } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const RETURN_URL = `${BASE_URL}/api/auth/steam/callback`;
const STEAM_OPENID_URL = 'https://steamcommunity.com/openid/login';

export async function GET() {
  const params = new URLSearchParams({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': RETURN_URL,
    'openid.realm': BASE_URL,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
  });

  redirect(`${STEAM_OPENID_URL}?${params.toString()}`);
}

