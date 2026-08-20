import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.md }, containerStyle]}>
      {label && (
        <Text style={[typography.subtitle2, { color: colors.textPrimary, marginBottom: spacing.xs }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.error : colors.border,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
          },
        ]}
      >
        {leftIcon && <View style={{ marginRight: spacing.xs }}>{leftIcon}</View>}
        <RNTextInput
          placeholderTextColor={colors.textMuted}
          style={[
            styles.input,
            typography.body1,
            { color: colors.textPrimary, paddingVertical: spacing.md },
            style,
          ]}
          {...props}
        />
        {rightIcon && <View style={{ marginLeft: spacing.xs }}>{rightIcon}</View>}
      </View>
      {error && (
        <Text style={[typography.caption, { color: colors.error, marginTop: spacing.xxs }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    flex: 1,
  },
});
