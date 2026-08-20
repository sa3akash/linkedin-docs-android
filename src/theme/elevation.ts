import { ViewStyle } from 'react-native';
import { shadows } from './shadows';

export const elevation: Record<number, ViewStyle> = {
  0: { elevation: 0 },
  1: shadows.sm,
  2: shadows.md,
  3: shadows.lg,
  4: shadows.xl,
};
