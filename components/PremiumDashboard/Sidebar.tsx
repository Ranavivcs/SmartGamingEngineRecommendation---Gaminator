'use client';

import { Home, Compass, Library, TrendingUp, Settings, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  onLogout?: () => void;
}

export function Sidebar({ activeItem = 'home', onItemClick, onLogout }: SidebarProps) {
  const router = useRouter();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'library', icon: Library, label: 'Library' },
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
  ];

  const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const handleClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-8 border-r border-[#1E1E1E] bg-[#0D0D0D]/80 backdrop-blur-sm z-20">
      {/* Navigation Items */}
      <div className="flex flex-col items-center gap-6 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="relative flex items-center justify-center w-12 h-12 rounded transition-colors hover:bg-[#2A2A2A] group"
              aria-label={item.label}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r" />
              )}
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive
                    ? 'text-white stroke-[2.5]'
                    : 'text-[#A0A0A0] group-hover:text-white/90'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Bottom Items */}
      <div className="flex flex-col items-center gap-6">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="relative flex items-center justify-center w-12 h-12 rounded transition-colors hover:bg-[#2A2A2A] group"
              aria-label={item.label}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r" />
              )}
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive
                    ? 'text-white stroke-[2.5]'
                    : 'text-[#A0A0A0] group-hover:text-white/90'
                }`}
              />
            </button>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-12 h-12 rounded transition-colors hover:bg-[#2A2A2A] group"
          aria-label="Logout"
        >
          <LogOut className="w-6 h-6 text-[#A0A0A0] group-hover:text-white/90 transition-colors" />
        </button>
      </div>
    </div>
  );
}

