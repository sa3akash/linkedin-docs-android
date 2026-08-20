import { useEffect, useState, useCallback } from 'react';
import { AccessibilityInfo, PixelRatio, useWindowDimensions } from 'react-native';
import { isRTL } from '../utils/rtl';

export const useAccessibility = () => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] = useState(false);
  const { fontScale } = useWindowDimensions();

  useEffect(() => {
    // Screen reader listener
    const updateScreenReader = (enabled: boolean) => setIsScreenReaderEnabled(enabled);
    const screenReaderSub = AccessibilityInfo.addEventListener('screenReaderChanged', updateScreenReader);
    AccessibilityInfo.isScreenReaderEnabled().then(setIsScreenReaderEnabled);

    // Reduce motion listener
    const updateReduceMotion = (enabled: boolean) => setIsReduceMotionEnabled(enabled);
    const reduceMotionSub = AccessibilityInfo.addEventListener('reduceMotionChanged', updateReduceMotion);
    AccessibilityInfo.isReduceMotionEnabled().then(setIsReduceMotionEnabled);

    return () => {
      screenReaderSub.remove();
      reduceMotionSub.remove();
    };
  }, []);

  const getScaledFontSize = useCallback(
    (baseFontSize: number, maxFontScale = 1.5): number => {
      const clampedScale = Math.min(fontScale, maxFontScale);
      return PixelRatio.roundToNearestPixel(baseFontSize * clampedScale);
    },
    [fontScale]
  );

  const announceForAccessibility = useCallback((message: string) => {
    AccessibilityInfo.announceForAccessibility(message);
  }, []);

  return {
    isScreenReaderEnabled,
    isReduceMotionEnabled,
    fontScale,
    isRTL: isRTL(),
    getScaledFontSize,
    announceForAccessibility,
  };
};
