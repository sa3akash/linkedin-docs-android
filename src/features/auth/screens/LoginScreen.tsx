import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { useStyles } from '../../../hooks/useStyles';
import { useKeyboardAvoidance } from '../../../hooks/useKeyboardAvoidance';
import { TextInput, PasswordInput, PrimaryButton, SecondaryButton } from '../../../components';
import { authApi } from '../api/auth.api';
import { Theme } from '../../../theme';

export interface LoginScreenProps {
  onNavigateToRegister: () => void;
  onNavigateToOTP: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToRegister,
  onNavigateToOTP,
}) => {
  const { t } = useTranslation();
  const { styles, theme } = useStyles(createStyles);
  const { typography } = theme;
  const { containerPaddingBottom } = useKeyboardAvoidance({ extraOffset: 16 });
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
      contentContainerStyle={[styles.container, { paddingBottom: containerPaddingBottom || theme.spacing.xl }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerContainer}>
        <Text style={[typography.h1, styles.brandTitle]}>LinkedIn</Text>
        <Text style={[typography.h2, styles.welcomeTitle]}>{t('common.welcome')}</Text>
        <Text style={[typography.body2, styles.subtitle]}>
          Stay updated on your professional world
        </Text>
      </View>

      {error ? (
        <Text style={[typography.caption, styles.errorText]}>{error}</Text>
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
        style={styles.forgotPassBtn}
      >
        <Text style={[typography.caption, styles.forgotPassText]}>
          {t('auth.forgotPassword')}
        </Text>
      </TouchableOpacity>

      <PrimaryButton
        title={t('auth.login')}
        onPress={handleLogin}
        isLoading={loading}
        style={styles.loginBtn}
      />

      <SecondaryButton title={t('auth.register')} onPress={onNavigateToRegister} />
    </ScrollView>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flexGrow: 1,
    justifyContent: 'center' as const,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  headerContainer: {
    marginBottom: 32,
  },
  brandTitle: {
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  welcomeTitle: {
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.textSecondary,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  forgotPassBtn: {
    alignSelf: 'flex-end' as const,
    marginBottom: theme.spacing.lg,
  },
  forgotPassText: {
    color: theme.colors.primary,
  },
  loginBtn: {
    marginBottom: theme.spacing.md,
  },
});
