import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
}) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.border : colors.primary,
          borderRadius: radius.round,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.textInverse} />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[typography.button, { color: colors.textInverse }, textStyle]}>{title}</Text>
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
  },
});
