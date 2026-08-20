import React from 'react';
import { Text } from 'react-native';
import { TextInput, TextInputProps } from './TextInput';
import { useTheme } from '../../hooks/useTheme';

export interface SearchInputProps extends TextInputProps {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { colors } = useTheme();

  return (
    <TextInput
      placeholder="Search..."
      leftIcon={<Text style={{ color: colors.textMuted }}>🔍</Text>}
      {...props}
    />
  );
};
