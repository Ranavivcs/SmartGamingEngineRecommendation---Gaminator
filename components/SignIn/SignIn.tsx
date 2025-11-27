'use client';

import { useState } from 'react';
import { SignInView } from './SignInView';
import { THEME_CONFIGS } from '@/types/theme';
import type { Theme } from '@/types/theme';

export function SignIn() {
  const [theme, setTheme] = useState<Theme>('neon');

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const backgroundUrl = THEME_CONFIGS[theme].backgroundUrl;

  return (
    <SignInView
      theme={theme}
      backgroundUrl={backgroundUrl}
      onThemeChange={handleThemeChange}
    />
  );
}

