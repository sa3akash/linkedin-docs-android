import React, { useRef, useState, ElementRef } from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface OTPInputProps {
  length?: number;
  onCodeFilled?: (code: string) => void;
}

type RNTextInputRef = ElementRef<typeof RNTextInput>;

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onCodeFilled }) => {
  const { colors, spacing, radius, typography } = useTheme();
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(RNTextInputRef | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    const fullCode = newCode.join('');
    if (fullCode.length === length && onCodeFilled) {
      onCodeFilled(fullCode);
    }

    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <RNTextInput
          key={index}
          ref={(ref) => {
            inputsRef.current[index] = ref;
          }}
          value={code[index]}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e.nativeEvent.key, index)}
          keyboardType="number-pad"
          maxLength={1}
          style={[
            styles.cell,
            typography.h2,
            {
              backgroundColor: colors.surface,
              borderColor: code[index] ? colors.primary : colors.border,
              borderRadius: radius.md,
              color: colors.textPrimary,
              marginHorizontal: spacing.xxs,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  cell: {
    width: 44,
    height: 52,
    borderWidth: 1.5,
    textAlign: 'center',
  },
});
