import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { useTheme } from '../../../hooks/useTheme';
import { TextInput, PasswordInput, PrimaryButton, SecondaryButton } from '../../../components';
import { authApi } from '../api/auth.api';

export interface LoginScreenProps {
  onNavigateToRegister: () => void;
  onNavigateToOTP: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToRegister,
  onNavigateToOTP,
}) => {
  const { t } = useTranslation();
  const { colors, spacing, typography } = useTheme();
  const { setAuthSession } = useAuth();

  const [email, setEmail] = useState('alex.morgan@linkedin.com');
  const [password, setPassword] = useState('Secret123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const data = await authApi.login({ email, password });
      setAuthSession(data.user, data.tokens);
    } catch {
      setError('Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background, padding: spacing.xl },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerContainer}>
        <Text style={[typography.h1, { color: colors.primary, marginBottom: spacing.xs }]}>
          LinkedIn
        </Text>
        <Text style={[typography.h2, { color: colors.textPrimary, marginBottom: spacing.xs }]}>
          {t('common.welcome')}
        </Text>
        <Text style={[typography.body2, { color: colors.textSecondary }]}>
          Stay updated on your professional world
        </Text>
      </View>

      {error ? (
        <Text style={[typography.caption, { color: colors.error, marginBottom: spacing.md }]}>
          {error}
        </Text>
      ) : null}

      <TextInput
        label={t('auth.email')}
        placeholder="name@domain.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <PasswordInput
        label={t('auth.password')}
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={() => onNavigateToOTP(email)}
        style={{ alignSelf: 'flex-end', marginBottom: spacing.lg }}
      >
        <Text style={[typography.caption, { color: colors.primary }]}>
          {t('auth.forgotPassword')}
        </Text>
      </TouchableOpacity>

      <PrimaryButton
        title={t('auth.login')}
        onPress={handleLogin}
        isLoading={loading}
        style={{ marginBottom: spacing.md }}
      />

      <SecondaryButton title={t('auth.register')} onPress={onNavigateToRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 32,
  },
});
