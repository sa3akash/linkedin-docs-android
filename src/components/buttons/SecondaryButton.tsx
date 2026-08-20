import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ButtonProps } from './PrimaryButton';
import { useTheme } from '../../hooks/useTheme';

export const SecondaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
}) => {
  const { colors, spacing, radius, typography } = useTheme();

  const dynamicStyles = {
    borderColor: colors.primary,
    borderRadius: radius.round,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      style={[styles.button, dynamicStyles, style]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[typography.button, { color: colors.primary }, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
});
