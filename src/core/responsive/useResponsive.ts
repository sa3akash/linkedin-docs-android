import { useWindowDimensions } from 'react-native';
import { breakpoints } from '../theme/tokens';

export type DeviceType = 'phone' | 'tablet' | 'foldable' | 'desktop';
export type Orientation = 'portrait' | 'landscape';

export interface ResponsiveInfo {
  width: number;
  height: number;
  deviceType: DeviceType;
  orientation: Orientation;
  isSmallScreen: boolean;
  isTabletOrLarger: boolean;
}

/**
 * Enterprise Responsive Layout Hook
 * Provides device type detection, breakpoint classification, and orientation tracking.
 */
export const useResponsive = (): ResponsiveInfo => {
  const { width, height } = useWindowDimensions();

  const orientation: Orientation = width > height ? 'landscape' : 'portrait';

  let deviceType: DeviceType = 'phone';
  if (width >= breakpoints.desktop) {
    deviceType = 'desktop';
  } else if (width >= breakpoints.foldable) {
    deviceType = 'foldable';
  } else if (width >= breakpoints.tablet) {
    deviceType = 'tablet';
  }

  return {
    width,
    height,
    deviceType,
    orientation,
    isSmallScreen: width < breakpoints.tablet,
    isTabletOrLarger: width >= breakpoints.tablet,
  };
};
