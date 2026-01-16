# Supabase Setup Guide

This guide will help you connect your gaming app to Supabase.

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: Your project name (e.g., "gaming-app")
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Click "Create new project" and wait for it to initialize (takes ~2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - **Keep this secret!**

## Step 3: Create Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase Service Role Key (for server-side operations)
# WARNING: Keep this secret! Never expose this in client-side code.
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Steam API Key (if not already set)
STEAM_API_KEY=your-steam-api-key

# Base URL for your app
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Replace the placeholder values with your actual Supabase credentials

## Step 4: Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase/migrations/001_create_users_table.sql`
4. Click "Run" (or press `Ctrl+Enter`)
5. You should see "Success. No rows returned"

This creates the `users` table with the following structure:
- `steam_id` (Primary Key)
- `username`
- `avatar`
- `profile_url`
- `created_at`
- `last_login`

## Step 5: Verify the Setup

1. In Supabase dashboard, go to **Table Editor**
2. You should see a `users` table
3. The table should be empty initially

## Step 6: Test Your Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try logging in with Steam - the user should be saved to Supabase
3. Check the `users` table in Supabase dashboard to verify the user was created

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure `.env.local` exists in the project root
- Verify all environment variables are set correctly
- Restart your development server after adding/changing environment variables

### Error: "relation 'users' does not exist"
- Make sure you ran the SQL migration (Step 4)
- Check that the table exists in Supabase dashboard → Table Editor

### Error: "permission denied"
- Verify you're using the `service_role` key (not the `anon` key) for server-side operations
- Check that Row Level Security (RLS) policies are set up correctly

## Migration from File-Based Storage

If you were previously using the file-based storage (`data/users.json`), your existing users won't automatically migrate. You can:

1. Export users from `data/users.json`
2. Manually insert them into Supabase using the SQL Editor, or
3. Let users re-authenticate (they'll be created automatically)

## Next Steps

- Consider adding more tables for game recommendations, user preferences, etc.
- Set up database backups in Supabase dashboard
- Configure additional RLS policies if needed for multi-user scenarios

