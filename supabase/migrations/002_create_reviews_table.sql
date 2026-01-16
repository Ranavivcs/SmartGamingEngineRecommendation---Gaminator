-- Create reviews table for storing user game reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  steam_id TEXT NOT NULL REFERENCES users(steam_id) ON DELETE CASCADE,
  game_id TEXT NOT NULL,
  game_title TEXT NOT NULL,
  reaction TEXT NOT NULL CHECK (reaction IN ('like', 'dislike')),
  reasons TEXT[] DEFAULT '{}',
  details_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Ensure one review per user per game (latest review wins)
  UNIQUE(steam_id, game_id)
);

-- Create index on steam_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_reviews_steam_id ON reviews(steam_id);

-- Create index on created_at for sorting recent reviews
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Create index on game_id for potential analytics
CREATE INDEX IF NOT EXISTS idx_reviews_game_id ON reviews(game_id);

-- Enable Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to do everything (for server-side operations)
CREATE POLICY "Service role can manage reviews"
  ON reviews
  FOR ALL
  USING (true)
  WITH CHECK (true);

