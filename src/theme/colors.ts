export interface ColorPalette {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  card: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  error: string;
  errorBackground: string;
  success: string;
  successBackground: string;
  warning: string;
  warningBackground: string;
  info: string;
  infoBackground: string;
  shimmerBase: string;
  shimmerHighlight: string;
  overlay: string;
  onlineStatus: string;
}

export const lightColors: ColorPalette = {
  primary: '#0A66C2', // LinkedIn Primary Blue
  primaryDark: '#004182',
  primaryLight: '#378FE9',
  secondary: '#057642',
  accent: '#E7A33E',
  background: '#F3F2EF', // LinkedIn Light Background
  surface: '#FFFFFF',
  surfaceVariant: '#F8F9FA',
  card: '#FFFFFF',
  border: '#E0E0E0',
  textPrimary: '#191919',
  textSecondary: '#666666',
  textMuted: '#8E8E8E',
  textInverse: '#FFFFFF',
  error: '#CC1010',
  errorBackground: '#FDF2F2',
  success: '#057642',
  successBackground: '#F0F9F4',
  warning: '#B25900',
  warningBackground: '#FFF8F0',
  info: '#0A66C2',
  infoBackground: '#F0F7FF',
  shimmerBase: '#E1E9EE',
  shimmerHighlight: '#F2F8FC',
  overlay: 'rgba(0, 0, 0, 0.5)',
  onlineStatus: '#44B700',
};

export const darkColors: ColorPalette = {
  primary: '#70B5F9',
  primaryDark: '#0A66C2',
  primaryLight: '#A3D2FA',
  secondary: '#56C288',
  accent: '#F5C96B',
  background: '#1D2226', // LinkedIn Dark Background
  surface: '#293138',
  surfaceVariant: '#242B30',
  card: '#293138',
  border: '#38434D',
  textPrimary: '#FFFFFF',
  textSecondary: '#E1E9EE',
  textMuted: '#A0ABBA',
  textInverse: '#191919',
  error: '#FF6B6B',
  errorBackground: '#3D1E1E',
  success: '#56C288',
  successBackground: '#1D3B2A',
  warning: '#F5C96B',
  warningBackground: '#3D321D',
  info: '#70B5F9',
  infoBackground: '#1D2E3D',
  shimmerBase: '#38434D',
  shimmerHighlight: '#4B5866',
  overlay: 'rgba(0, 0, 0, 0.7)',
  onlineStatus: '#56C288',
};

export const amoledColors: ColorPalette = {
  primary: '#70B5F9',
  primaryDark: '#0A66C2',
  primaryLight: '#A3D2FA',
  secondary: '#56C288',
  accent: '#F5C96B',
  background: '#000000', // Pure Black
  surface: '#121212',
  surfaceVariant: '#1E1E1E',
  card: '#121212',
  border: '#2A2A2A',
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textMuted: '#888888',
  textInverse: '#000000',
  error: '#FF5252',
  errorBackground: '#260000',
  success: '#4CAF50',
  successBackground: '#002604',
  warning: '#FFC107',
  warningBackground: '#261D00',
  info: '#2196F3',
  infoBackground: '#001926',
  shimmerBase: '#1E1E1E',
  shimmerHighlight: '#333333',
  overlay: 'rgba(0, 0, 0, 0.85)',
  onlineStatus: '#4CAF50',
};
