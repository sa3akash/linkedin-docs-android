import { useWindowDimensions } from 'react-native';

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  const scale = (size: number) => (width / BASE_WIDTH) * size;
  const verticalScale = (size: number) => (height / BASE_HEIGHT) * size;
  const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

  const isLandscape = width > height;
  const isTablet = width >= 768;

  return {
    width,
    height,
    scale,
    verticalScale,
    moderateScale,
    isLandscape,
    isTablet,
  };
};
