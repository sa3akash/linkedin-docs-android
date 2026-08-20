import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SecondaryButton } from '../buttons/SecondaryButton';

export interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
}) => {
  const { colors, spacing, radius, typography, shadows } = useTheme();

  const confirmButtonStyle: ViewStyle = isDestructive
    ? { ...styles.halfBtn, backgroundColor: colors.error }
    : styles.halfBtn;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: colors.surface,
                  borderRadius: radius.xl,
                  padding: spacing.xl,
                },
                shadows.lg,
              ]}
            >
              <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.sm }]}>
                {title}
              </Text>
              <Text
                style={[typography.body2, { color: colors.textSecondary, marginBottom: spacing.xl }]}
              >
                {message}
              </Text>
              <View style={styles.buttonRow}>
                <SecondaryButton
                  title={cancelText}
                  onPress={onCancel}
                  style={styles.halfBtn}
                />
                <PrimaryButton
                  title={confirmText}
                  onPress={onConfirm}
                  style={confirmButtonStyle}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfBtn: {
    width: '48%',
  },
});
