'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
}

export function DashboardView() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl"
        >
          Loading your profile...
        </motion.div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-center">
          <p className="text-white text-xl mb-4">{error || 'Failed to load profile'}</p>
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white">Your Gaming Profile</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-blue-500/30"
        >
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 flex-shrink-0">
              <Image
                src={profile.user.avatar}
                alt={profile.user.username}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-bold text-white mb-2 truncate">
                {profile.user.username}
              </h2>
              <a
                href={profile.user.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors inline-block"
              >
                View Steam Profile →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30"
          >
            <h3 className="text-gray-400 text-sm uppercase mb-2">Total Games</h3>
            <p className="text-4xl font-bold text-white">{profile.stats.totalGames.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30"
          >
            <h3 className="text-gray-400 text-sm uppercase mb-2">Total Playtime</h3>
            <p className="text-4xl font-bold text-white">
              {profile.stats.totalPlaytimeHours.toLocaleString()}h
            </p>
          </motion.div>
        </div>

        {/* Recent Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recently Played Games</h2>
          
          {profile.recentGames.length === 0 ? (
            <p className="text-gray-400">No recently played games found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.recentGames.map((game, index) => (
                <motion.div
                  key={game.appId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {game.logoUrl && (
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={game.logoUrl}
                          alt={game.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== game.iconUrl) {
                              target.src = game.iconUrl;
                            }
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate mb-1">
                        {game.name}
                      </h3>
                      <div className="text-sm text-gray-400 space-y-0.5">
                        {game.playtime2Weeks > 0 && (
                          <p>Last 2 weeks: {formatPlaytime(game.playtime2Weeks)}</p>
                        )}
                        <p>Total: {formatPlaytime(game.playtimeForever)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

