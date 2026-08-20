import { useWindowDimensions } from 'react-native';

export type Orientation = 'portrait' | 'landscape';

export const useOrientation = (): Orientation => {
  const { width, height } = useWindowDimensions();
  return width > height ? 'landscape' : 'portrait';
};
