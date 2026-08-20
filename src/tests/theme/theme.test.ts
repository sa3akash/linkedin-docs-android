import { createTheme, lightColors, darkColors, amoledColors } from '../../theme';

describe('Theme System', () => {
  it('should return light theme colors for light mode', () => {
    const theme = createTheme('light', false);
    expect(theme.colors.background).toBe(lightColors.background);
    expect(theme.isDark).toBe(false);
  });

  it('should return dark theme colors for dark mode', () => {
    const theme = createTheme('dark', false);
    expect(theme.colors.background).toBe(darkColors.background);
    expect(theme.isDark).toBe(true);
  });

  it('should return amoled pure black background for amoled mode', () => {
    const theme = createTheme('amoled', false);
    expect(theme.colors.background).toBe(amoledColors.background);
    expect(theme.colors.background).toBe('#000000');
    expect(theme.isDark).toBe(true);
  });

  it('should respect system dark preference when theme is set to system', () => {
    const darkTheme = createTheme('system', true);
    expect(darkTheme.isDark).toBe(true);

    const lightTheme = createTheme('system', false);
    expect(lightTheme.isDark).toBe(false);
  });
});
