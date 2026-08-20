import React, { memo } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { colors, radius, spacing, zIndex } from '../../../core/theme/tokens';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = memo(({ message, type = 'info', visible }) => {
  if (!visible) return null;

  const bgStyle =
    type === 'error'
      ? { backgroundColor: colors.error }
      : type === 'success'
      ? { backgroundColor: colors.success }
      : { backgroundColor: colors.surfaceDark };

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: spacing.lg,
    right: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    zIndex: zIndex.toast,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: '600',
  },
});
