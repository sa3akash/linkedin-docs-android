import { I18nManager } from 'react-native';

export const isRTL = (): boolean => I18nManager.isRTL;

export const forceRTL = (enable: boolean): void => {
  I18nManager.allowRTL(enable);
  I18nManager.forceRTL(enable);
};

export const getRTLFlexDirection = (
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row'
): 'row' | 'row-reverse' | 'column' | 'column-reverse' => {
  if (!I18nManager.isRTL) return direction;
  if (direction === 'row') return 'row-reverse';
  if (direction === 'row-reverse') return 'row';
  return direction;
};

export const getRTLTextAlign = (
  align: 'left' | 'right' | 'center' | 'justify' = 'left'
): 'left' | 'right' | 'center' | 'justify' => {
  if (!I18nManager.isRTL) return align;
  if (align === 'left') return 'right';
  if (align === 'right') return 'left';
  return align;
};
