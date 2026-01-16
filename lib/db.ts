import { createSupabaseServerClient } from './supabase';

export interface User {
  steamId: string;
  username: string;
  avatar: string;
  profileUrl: string;
  createdAt: string;
  lastLogin: string;
}

// Database row type (matches Supabase table structure)
interface UserRow {
  steam_id: string;
  username: string;
  avatar: string;
  profile_url: string;
  created_at: string;
  last_login: string;
}

// Convert database row to User interface
function rowToUser(row: UserRow): User {
  return {
    steamId: row.steam_id,
    username: row.username,
    avatar: row.avatar,
    profileUrl: row.profile_url,
    createdAt: row.created_at,
    lastLogin: row.last_login,
  };
}

// Convert User interface to database row
function userToRow(user: Partial<User> & { steamId: string }): Partial<UserRow> {
  return {
    steam_id: user.steamId,
    username: user.username || 'Unknown',
    avatar: user.avatar || '',
    profile_url: user.profileUrl || `https://steamcommunity.com/profiles/${user.steamId}`,
    last_login: new Date().toISOString(),
  };
}

// Find user by Steam ID
export async function getUserBySteamId(steamId: string): Promise<User | null> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('steam_id', steamId)
      .single();

    if (error) {
      // If user not found, return null (not an error)
      if (error.code === 'PGRST116') {
        return null;
      }
      // If table doesn't exist, provide helpful error message
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.error('❌ Database table "users" does not exist. Please run the migration in Supabase SQL Editor.');
        throw new Error('Database table "users" does not exist. Please run the migration SQL in Supabase dashboard.');
      }
      console.error('Error fetching user from Supabase:', error);
      throw error;
    }

    return data ? rowToUser(data as UserRow) : null;
  } catch (error) {
    console.error('Error in getUserBySteamId:', error);
    throw error;
  }
}

// Create or update user (upsert operation)
export async function createOrUpdateUser(
  userData: Partial<User> & { steamId: string }
): Promise<User> {
  try {
    const supabase = createSupabaseServerClient();
    const now = new Date().toISOString();
    
    // Check if user exists to preserve created_at
    const existing = await getUserBySteamId(userData.steamId);
    const createdAt = existing?.createdAt || now;

    const rowData = {
      ...userToRow(userData),
      created_at: createdAt,
    };

    const { data, error } = await supabase
      .from('users')
      .upsert(rowData, {
        onConflict: 'steam_id',
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting user to Supabase:', error);
      throw new Error(`Failed to save user: ${error.message}`);
    }

    return rowToUser(data as UserRow);
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw error;
  }
}

