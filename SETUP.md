# Setup Guide for New Developers

This guide will help you set up the project after cloning it from the repository.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Steam API Configuration
STEAM_API_KEY=your-steam-api-key-here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# OpenAI API (for AI recommendations)
OPENAI_API_KEY=your-openai-api-key

# RAWG API (for game data)
RAWG_API_KEY=your-rawg-api-key

# Base URL for your app
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### How to Get Each API Key:

#### 1. Steam API Key
1. Go to [https://steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
2. Sign in with your Steam account
3. Register for a new API key
4. Copy the key and add it to `.env.local` as `STEAM_API_KEY`

#### 2. Supabase Setup
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Create a new project
4. Go to **Settings** → **API**
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

#### 3. OpenAI API Key
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key and add it to `.env.local` as `OPENAI_API_KEY`

#### 4. RAWG API Key
1. Go to [https://rawg.io/apidocs](https://rawg.io/apidocs)
2. Sign up for a free account
3. Go to your account settings and generate an API key
4. Copy the key and add it to `.env.local` as `RAWG_API_KEY`

## Step 3: Set Up Supabase Database

After creating your Supabase project, you need to run the database migrations:

1. Go to your Supabase dashboard → **SQL Editor**
2. Run the migrations in order:

### Migration 1: Create Users Table
Copy and run the contents of `supabase/migrations/001_create_users_table.sql`

### Migration 2: Create Reviews Table
Copy and run the contents of `supabase/migrations/002_create_reviews_table.sql`

**Note:** Make sure to run them in order (users table first, then reviews table).

## Step 4: Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Step 5: Test Steam Login

1. Navigate to `http://localhost:3000`
2. Click "Sign in with Steam"
3. Complete the Steam authentication
4. You should be redirected to the dashboard

## Troubleshooting

### "Authentication failed" error
- Check that your `STEAM_API_KEY` is correct
- Verify your Supabase project is active (not paused)
- Make sure you've run the database migrations

### "Failed to fetch profile" error
- Verify your Supabase credentials are correct
- Check that the `users` table exists in Supabase
- Make sure you've run the database migrations

### "Missing Supabase environment variables" error
- Ensure `.env.local` exists in the project root
- Verify all Supabase variables are set
- Restart your dev server after adding environment variables

### Supabase project is paused
- Free tier projects pause after 7 days of inactivity
- Go to your Supabase dashboard and click "Restore" to reactivate

## What Gets Cloned vs. What You Need to Set Up

### ✅ Cloned from Repository:
- All source code
- Package dependencies (package.json)
- Database migration SQL files
- Configuration files

### ❌ NOT Cloned (You Need to Set Up):
- `.env.local` file (contains API keys - gitignored for security)
- Supabase project (you need to create your own)
- Database tables (you need to run migrations)
- API keys (Steam, OpenAI, RAWG, Supabase)

## Quick Checklist

- [ ] Cloned the repository
- [ ] Ran `npm install`
- [ ] Created `.env.local` file
- [ ] Got Steam API key
- [ ] Created Supabase project
- [ ] Got Supabase credentials
- [ ] Got OpenAI API key
- [ ] Got RAWG API key
- [ ] Ran database migrations in Supabase
- [ ] Started dev server with `npm run dev`
- [ ] Tested Steam login

## Need Help?

- Check `SUPABASE_SETUP.md` for detailed Supabase setup instructions
- Review the error messages in the browser console (F12)
- Check the terminal output for server-side errors
