import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { OTPInput, PrimaryButton } from '../../../components';

export interface OTPVerificationScreenProps {
  email: string;
  onVerified: () => void;
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  email,
  onVerified,
}) => {
  const { t } = useTranslation();
  const { colors, spacing, typography } = useTheme();
  const [code, setCode] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.xl }]}>
      <Text style={[typography.h2, { color: colors.textPrimary, marginBottom: spacing.xs }]}>
        {t('auth.otpVerify')}
      </Text>
      <Text style={[typography.body2, { color: colors.textSecondary, marginBottom: spacing.lg }]}>
        We sent a 6-digit code to {email}
      </Text>

      <OTPInput length={6} onCodeFilled={setCode} />

      <PrimaryButton
        title={t('common.confirm')}
        onPress={onVerified}
        disabled={code.length < 6}
        style={{ marginTop: spacing.xl }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
