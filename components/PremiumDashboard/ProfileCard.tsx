'use client';

import Image from 'next/image';
import { User, Gamepad2, Clock } from 'lucide-react';

interface ProfileCardProps {
  username: string;
  avatar: string;
  profileUrl: string;
  totalGames: number;
  totalPlaytimeHours: number;
}

export function ProfileCard({
  username,
  avatar,
  profileUrl,
  totalGames,
  totalPlaytimeHours,
}: ProfileCardProps) {
  return (
    <div className="bg-[#141414] rounded-lg p-6 border border-[#1E1E1E] mb-8">
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 bg-[#0D0D0D]">
          <Image
            src={avatar}
            alt={username}
            fill
            className="object-cover w-full h-full"
            sizes="80px"
            priority
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-[#B5B5B5]" />
            <h2 className="text-white/90 text-2xl font-medium truncate">{username}</h2>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B5B5B5] hover:text-white/90 text-sm transition-colors inline-flex items-center gap-1"
          >
            View Steam Profile →
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0D0D0D] rounded-lg p-4 border border-[#1E1E1E]">
          <div className="flex items-center gap-2 mb-2">
            <Gamepad2 className="w-5 h-5 text-[#B5B5B5]" />
            <span className="text-[#B5B5B5] text-sm">Total Games</span>
          </div>
          <p className="text-white/90 text-2xl font-medium">{totalGames.toLocaleString()}</p>
        </div>

        <div className="bg-[#0D0D0D] rounded-lg p-4 border border-[#1E1E1E]">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-[#B5B5B5]" />
            <span className="text-[#B5B5B5] text-sm">Total Playtime</span>
          </div>
          <p className="text-white/90 text-2xl font-medium">{totalPlaytimeHours.toLocaleString()}h</p>
        </div>
      </div>
    </div>
  );
}

