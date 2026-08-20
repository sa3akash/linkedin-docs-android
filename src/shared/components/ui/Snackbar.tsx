import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface SnackbarProps {
  visible: boolean;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = memo(({ visible, message, actionText, onAction }) => {
  if (!visible) return null;
  return (
    <View style={styles.snackbarContainer}>
      <Text style={styles.snackbarText}>{message}</Text>
      {actionText && onAction && (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.snackbarAction}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  snackbarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#323232',
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  snackbarText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  snackbarAction: {
    color: '#0A66C2',
    fontWeight: 'bold',
  },
});
