import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomSheetModal } from './BottomSheetModal';
import { useTheme } from '../../hooks/useTheme';

export interface ActionSheetOption {
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
  icon?: string;
}

export interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  options: ActionSheetOption[];
}

export const ActionSheet: React.FC<ActionSheetProps> = ({ visible, onClose, title, options }) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
      {title && (
        <Text style={[typography.subtitle2, { color: colors.textMuted, marginBottom: spacing.md }]}>
          {title}
        </Text>
      )}
      <View style={styles.optionsList}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              option.onPress();
              onClose();
            }}
            style={[
              styles.optionItem,
              { paddingVertical: spacing.md, borderBottomColor: colors.border },
            ]}
          >
            {option.icon && (
              <Text style={[typography.h3, { marginRight: spacing.md }]}>{option.icon}</Text>
            )}
            <Text
              style={[
                typography.body1,
                { color: option.isDestructive ? colors.error : colors.textPrimary },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  optionsList: {
    width: '100%',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
});
