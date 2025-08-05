import { Platform } from 'react-native';
import { useColorScheme } from 'react-native';

// Light and dark color palettes
const lightColors = {
  primary: '#007AFF',
  primaryDark: '#0051A8',
  background: '#23272F', // darker than white
  card: '#262B36',
  text: '#fff',
  textSecondary: '#B0B3B8',
  border: '#353A45',
  accent: '#00C6FB',
  shadow: 'rgba(0,0,0,0.12)',
};

const darkColors = {
  primary: '#4F8CFF',
  primaryDark: '#1A3A6B',
  background: '#181A20',
  card: '#23272F',
  text: '#fff',
  textSecondary: '#B0B3B8',
  border: '#23272F',
  accent: '#00C6FB',
  shadow: 'rgba(0,0,0,0.32)',
};

export const font = {
  family: Platform.select({ ios: 'San Francisco', android: 'Roboto', default: 'System' }),
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weight: {
    regular: '400',
    medium: '500',
    bold: '700',
    extrabold: '800',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Hook to get current theme
export function useTheme() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? darkColors : lightColors;
  return { colors, font, spacing, isDark: scheme === 'dark' };
} 