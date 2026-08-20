/**
 * Enterprise Design System Tokens
 * Defines atomic design tokens for typography, spacing, colors, shadows, radius, zIndex, and breakpoints.
 */

export const colors = {
  primary: '#0A66C2',
  primaryDark: '#004182',
  primaryLight: '#378FE9',
  secondary: '#70B5F9',
  background: '#F3F2EF',
  surface: '#FFFFFF',
  surfaceDark: '#1D2226',
  textPrimary: '#000000E6',
  textSecondary: '#00000099',
  textMuted: '#00000066',
  textInverse: '#FFFFFF',
  border: '#E0E0E0',
  error: '#D92525',
  warning: '#E7A33E',
  success: '#057642',
  info: '#0A66C2',
} as const;

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const shadows = {
  none: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export const zIndex = {
  base: 0,
  card: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 500,
  modal: 1000,
  toast: 2000,
} as const;

export const opacity = {
  transparent: 0,
  subtle: 0.1,
  medium: 0.5,
  high: 0.8,
  opaque: 1,
} as const;

export const duration = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const breakpoints = {
  phone: 0,
  tablet: 768,
  foldable: 1024,
  desktop: 1280,
} as const;
