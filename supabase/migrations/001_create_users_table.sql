-- Create users table for storing Steam user data
CREATE TABLE IF NOT EXISTS users (
  steam_id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '',
  profile_url TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on steam_id for faster lookups (already primary key, but explicit for clarity)
CREATE INDEX IF NOT EXISTS idx_users_steam_id ON users(steam_id);

-- Create index on last_login for potential queries
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to do everything (for server-side operations)
-- This is safe because we're using the service role key only on the server
CREATE POLICY "Service role can manage users"
  ON users
  FOR ALL
  USING (true)
  WITH CHECK (true);

