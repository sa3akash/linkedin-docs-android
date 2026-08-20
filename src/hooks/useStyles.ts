import { useMemo } from 'react';
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useTheme } from './useTheme';
import { Theme } from '../theme';

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export type StyleFactory<T extends NamedStyles<T>> = (theme: Theme) => T;

export function useStyles<T extends NamedStyles<T>>(
  factory: StyleFactory<T>
): { styles: T; theme: Theme } {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create(factory(theme));
  }, [factory, theme]);

  return { styles, theme };
}
