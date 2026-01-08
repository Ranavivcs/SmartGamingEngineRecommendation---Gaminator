'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface GameCardProps {
  appId: number;
  name: string;
  logoUrl: string;
  iconUrl: string;
  playtimeForever: number;
  playtime2Weeks?: number;
}

export function GameCard({
  appId,
  name,
  logoUrl,
  iconUrl,
  playtimeForever,
  playtime2Weeks,
}: GameCardProps) {
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

  return (
    <motion.div
      whileHover={{ y: -4, backgroundColor: '#171717' }}
      transition={{ duration: 0.2 }}
      className="bg-[#141414] rounded-lg overflow-hidden border border-[#1E1E1E] hover:border-[#2A2A2A] transition-colors cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#0D0D0D]">
        <Image
          src={logoUrl || iconUrl}
          alt={name}
          fill
          className="object-contain w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            const fallbackUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;
            if (target.src !== iconUrl && target.src !== fallbackUrl) {
              target.src = iconUrl;
            } else if (target.src !== fallbackUrl) {
              target.src = fallbackUrl;
            }
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white/90 font-medium mb-2 truncate tracking-tight">{name}</h3>
        <div className="text-[#B5B5B5] text-sm space-y-1">
          <p>Total: {formatPlaytime(playtimeForever)}</p>
        </div>
      </div>
    </motion.div>
  );
}

