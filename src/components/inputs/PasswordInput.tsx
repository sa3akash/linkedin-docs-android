import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { TextInput, TextInputProps } from './TextInput';
import { useTheme } from '../../hooks/useTheme';

export type PasswordInputProps = Omit<TextInputProps, 'secureTextEntry'>;

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [isSecure, setIsSecure] = useState(true);
  const { colors, typography } = useTheme();

  return (
    <TextInput
      {...props}
      secureTextEntry={isSecure}
      rightIcon={
        <TouchableOpacity onPress={() => setIsSecure(!isSecure)} activeOpacity={0.7}>
          <Text style={[typography.caption, { color: colors.primary }]}>
            {isSecure ? 'Show' : 'Hide'}
          </Text>
        </TouchableOpacity>
      }
    />
  );
};
