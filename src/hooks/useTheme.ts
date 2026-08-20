import { useColorScheme } from 'react-native';
import { useThemeStore } from '../stores/theme.store';
import { createTheme, Theme } from '../theme';

export const useTheme = (): Theme & { setThemeMode: (mode: Theme['mode']) => void } => {
  const systemColorScheme = useColorScheme();
  const themeMode = useThemeStore((state) => state.themeMode);
  const setThemeMode = useThemeStore((state) => state.setThemeMode);

  const systemIsDark = systemColorScheme === 'dark';
  const theme = createTheme(themeMode, systemIsDark);

  return {
    ...theme,
    setThemeMode,
  };
};
