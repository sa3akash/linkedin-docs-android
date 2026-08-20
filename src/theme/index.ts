import { ColorPalette, lightColors, darkColors, amoledColors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { typography } from './typography';
import { shadows } from './shadows';
import { elevation } from './elevation';

export type ThemeMode = 'light' | 'dark' | 'amoled' | 'system';

export interface Theme {
  mode: ThemeMode;
  colors: ColorPalette;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  shadows: typeof shadows;
  elevation: typeof elevation;
  isDark: boolean;
}

export const getThemeColors = (mode: ThemeMode, systemIsDark: boolean): ColorPalette => {
  if (mode === 'system') {
    return systemIsDark ? darkColors : lightColors;
  }
  switch (mode) {
    case 'dark':
      return darkColors;
    case 'amoled':
      return amoledColors;
    case 'light':
    default:
      return lightColors;
  }
};

export const createTheme = (mode: ThemeMode, systemIsDark: boolean): Theme => {
  const colors = getThemeColors(mode, systemIsDark);
  const isDark = mode === 'dark' || mode === 'amoled' || (mode === 'system' && systemIsDark);

  return {
    mode,
    colors,
    spacing,
    radius,
    typography,
    shadows,
    elevation,
    isDark,
  };
};

export * from './colors';
export * from './spacing';
export * from './radius';
export * from './typography';
export * from './shadows';
export * from './elevation';
