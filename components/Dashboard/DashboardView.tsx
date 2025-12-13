'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/PremiumDashboard/Sidebar';
import { RightPanel } from '@/components/PremiumDashboard/RightPanel';
import { HeroCard } from '@/components/PremiumDashboard/HeroCard';
import { GameGrid } from '@/components/PremiumDashboard/GameGrid';
import { ProfileCard } from '@/components/PremiumDashboard/ProfileCard';

interface Game {
  appId: number;
  name: string;
  playtime2Weeks: number;
  playtimeForever: number;
  iconUrl: string;
  logoUrl: string;
}

interface UserProfile {
  user: {
    steamId: string;
    username: string;
    avatar: string;
    profileUrl: string;
  };
  stats: {
    totalGames: number;
    totalPlaytimeHours: number;
  };
  recentGames: Game[];
  ownedGames: Game[];
}

export function DashboardView() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.push('/login');
  };

  // Format playtime helper
  const formatPlaytime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    }
    return `${mins}m`;
  };

  // Sort owned games by playtime (most played first)
  const sortedOwnedGames = profile?.ownedGames
    ? [...profile.ownedGames].sort((a, b) => b.playtimeForever - a.playtimeForever)
    : [];

  // Get featured game (most played game)
  const heroGame = sortedOwnedGames?.[0] || profile?.recentGames?.[0] || null;
  
  // Get other games (skip the hero game)
  const otherGames = sortedOwnedGames
    .filter((game) => game.appId !== heroGame?.appId)
    .slice(0, 11); // Show 11 more games (12 total including hero)

  if (loading) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/90 text-xl"
        >
          Loading your profile...
        </motion.div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/90 text-xl mb-4">{error || 'Failed to load profile'}</p>
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/90 rounded-lg border border-white/20 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background Layers */}
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1581351123004-757df051db8e?w=1920&q=80)',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/65" />
      
      {/* Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      <div className="fixed inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
      
      {/* Animated Glows */}
      <motion.div
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(255, 50, 80, 0.15) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 60%, rgba(200, 50, 150, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* UI Layer */}
      <div className="relative z-10">
        <Sidebar activeItem={activeNav} onItemClick={setActiveNav} onLogout={handleLogout} />
        <RightPanel />

        {/* Main Content */}
        <main className="ml-20 mr-72 py-16 px-12 max-lg:ml-0 max-lg:mr-0 max-lg:px-6">
          {/* Profile Section */}
          <ProfileCard
            username={profile.user.username}
            avatar={profile.user.avatar}
            profileUrl={profile.user.profileUrl}
            totalGames={profile.stats.totalGames}
            totalPlaytimeHours={profile.stats.totalPlaytimeHours}
          />

          {/* Featured Game */}
          {heroGame ? (
            <HeroCard
              title={heroGame.name}
              image={heroGame.logoUrl || heroGame.iconUrl}
              genre="Game"
              duration={formatPlaytime(heroGame.playtimeForever)}
              difficulty="Medium"
            />
          ) : (
            <div className="max-w-4xl mb-12">
              <div className="bg-[#141414] rounded-lg p-8 border border-[#1E1E1E]">
                <h1 className="text-white/90 text-3xl font-medium mb-4">Welcome, {profile.user.username}!</h1>
                <p className="text-[#B5B5B5]">No games found. Start playing some games to see them here.</p>
              </div>
            </div>
          )}
          
          {/* All Owned Games */}
          {otherGames.length > 0 && (
            <GameGrid games={otherGames} title="Your Games Library" />
          )}

          {sortedOwnedGames.length === 0 && (
            <div className="bg-[#141414] rounded-lg p-8 border border-[#1E1E1E]">
              <p className="text-[#B5B5B5] text-center">No games in your library yet.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

