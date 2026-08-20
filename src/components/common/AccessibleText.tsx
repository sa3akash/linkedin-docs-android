import React, { memo } from 'react';
import { Text, TextProps, TextStyle, StyleProp } from 'react-native';
import { useAccessibility } from '../../hooks/useAccessibility';

export interface AccessibleTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  baseFontSize?: number;
  maxFontScale?: number;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const AccessibleText: React.FC<AccessibleTextProps> = memo(({
  children,
  style,
  baseFontSize = 14,
  maxFontScale = 1.5,
  accessibilityLabel,
  accessibilityHint,
  ...restProps
}) => {
  const { getScaledFontSize } = useAccessibility();

  const scaledFontSize = getScaledFontSize(baseFontSize, maxFontScale);

  return (
    <Text
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel || (typeof children === 'string' ? children : undefined)}
      accessibilityHint={accessibilityHint}
      maxFontSizeMultiplier={maxFontScale}
      style={[{ fontSize: scaledFontSize }, style]}
      {...restProps}
    >
      {children}
    </Text>
  );
});
