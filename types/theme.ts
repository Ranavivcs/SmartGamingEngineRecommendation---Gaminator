export type Theme = 'neon' | 'warm' | 'cool';

export interface ThemeConfig {
  label: string;
  color: string;
  backgroundUrl: string;
}

export const THEME_CONFIGS: Record<Theme, ThemeConfig> = {
  neon: {
    label: 'Dark + Neon',
    color: '#FF4655',
    backgroundUrl: 'https://images.unsplash.com/photo-1762217235246-4235328d882b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFyYWN0ZXJzJTIwZGFya3xlbnwxfHx8fDE3NjQyNTI0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  warm: {
    label: 'Warm Orange',
    color: '#FF8A4E',
    backgroundUrl: 'https://images.unsplash.com/photo-1737991984094-d01dd0ebdffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwYWN0aW9uJTIwZmlyZXxlbnwxfHx8fDE3NjQyNTI0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  cool: {
    label: 'Cool Blue Sci-Fi',
    color: '#4FC3F7',
    backgroundUrl: 'https://images.unsplash.com/photo-1664092815283-19c6196f5319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBuZW9ufGVufDF8fHx8MTc2NDI1MjQ0NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
};

export interface ThemeColors {
  border: string;
  glow: string;
  buttonHover: string;
  accentGlow: string;
}

export const getThemeColors = (theme: Theme): ThemeColors => {
  switch (theme) {
    case 'neon':
      return {
        border: '#FF4655',
        glow: 'rgba(255, 70, 85, 0.3)',
        buttonHover: 'rgba(10, 61, 98, 0.9)',
        accentGlow: '0 0 30px rgba(255, 70, 85, 0.5)',
      };
    case 'warm':
      return {
        border: '#FF8A4E',
        glow: 'rgba(255, 138, 78, 0.3)',
        buttonHover: 'rgba(10, 61, 98, 0.9)',
        accentGlow: '0 0 30px rgba(255, 138, 78, 0.5)',
      };
    case 'cool':
      return {
        border: '#4FC3F7',
        glow: 'rgba(79, 195, 247, 0.3)',
        buttonHover: 'rgba(10, 61, 98, 0.9)',
        accentGlow: '0 0 30px rgba(79, 195, 247, 0.5)',
      };
    default:
      return {
        border: '#FF4655',
        glow: 'rgba(255, 70, 85, 0.3)',
        buttonHover: 'rgba(10, 61, 98, 0.9)',
        accentGlow: '0 0 30px rgba(255, 70, 85, 0.5)',
      };
  }
};

export const getOverlayGradient = (theme: Theme): string => {
  switch (theme) {
    case 'neon':
      return 'linear-gradient(135deg, rgba(11, 13, 23, 0.85) 0%, rgba(16, 19, 31, 0.9) 50%, rgba(20, 15, 25, 0.85) 100%)';
    case 'warm':
      return 'linear-gradient(135deg, rgba(20, 10, 5, 0.85) 0%, rgba(25, 15, 10, 0.9) 50%, rgba(30, 18, 10, 0.85) 100%)';
    case 'cool':
      return 'linear-gradient(135deg, rgba(5, 10, 20, 0.85) 0%, rgba(10, 15, 28, 0.9) 50%, rgba(8, 15, 35, 0.85) 100%)';
    default:
      return 'linear-gradient(135deg, rgba(11, 13, 23, 0.85) 0%, rgba(16, 19, 31, 0.9) 50%, rgba(20, 15, 25, 0.85) 100%)';
  }
};

export const getParticleColor = (theme: Theme): string => {
  switch (theme) {
    case 'neon':
      return '#FF4655';
    case 'warm':
      return '#FF8A4E';
    case 'cool':
      return '#4FC3F7';
    default:
      return '#FF4655';
  }
};

