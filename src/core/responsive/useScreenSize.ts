import { useWindowDimensions } from 'react-native';

export interface ScreenSize {
  width: number;
  height: number;
}

export const useScreenSize = (): ScreenSize => {
  const { width, height } = useWindowDimensions();
  return { width, height };
};
