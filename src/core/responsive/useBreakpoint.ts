import { useWindowDimensions } from 'react-native';
import { breakpoints } from '../theme/tokens/breakpoints';

export type BreakpointKey = 'phone' | 'tablet' | 'foldable' | 'desktop';

export const useBreakpoint = (): BreakpointKey => {
  const { width } = useWindowDimensions();

  if (width >= breakpoints.desktop) {
    return 'desktop';
  }
  if (width >= breakpoints.foldable) {
    return 'foldable';
  }
  if (width >= breakpoints.tablet) {
    return 'tablet';
  }
  return 'phone';
};
