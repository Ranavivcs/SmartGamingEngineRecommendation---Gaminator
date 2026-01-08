'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';

interface HeroCardProps {
  title: string;
  image: string;
  genre?: string;
  duration?: string;
  difficulty?: string;
}

export function HeroCard({ title, image, genre, duration, difficulty }: HeroCardProps) {
  return (
    <div className="max-w-4xl mb-12">
      {/* Image Section */}
      <div className="relative aspect-[21/9] overflow-hidden rounded-lg mb-4 bg-[#0D0D0D]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // Try fallback to header image if available
            const fallbackUrl = image.replace(/\/[^/]+\.jpg$/, '/header.jpg');
            if (target.src !== fallbackUrl) {
              target.src = fallbackUrl;
            }
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-white/90 text-3xl font-medium mb-4 tracking-tight">{title}</h1>
          <div className="flex items-center gap-4 flex-wrap">
            {genre && (
              <span className="px-3 py-1 bg-white/10 text-white/90 text-sm rounded border border-white/20">
                {genre}
              </span>
            )}
            {duration && (
              <span className="text-[#B5B5B5] text-sm">⏱ {duration}</span>
            )}
            {difficulty && (
              <span className="text-[#B5B5B5] text-sm">⚡ {difficulty}</span>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

