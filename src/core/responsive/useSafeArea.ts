import { useSafeAreaInsets, EdgeInsets } from 'react-native-safe-area-context';

export const useSafeArea = (): EdgeInsets => {
  try {
    return useSafeAreaInsets();
  } catch {
    // Fallback safe area insets if outside SafeAreaProvider
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
};
