import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { useTheme } from '../../../hooks/useTheme';
import { TextInput, PasswordInput, PrimaryButton, SecondaryButton } from '../../../components';
import { authApi } from '../api/auth.api';

export interface RegisterScreenProps {
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigateToLogin }) => {
  const { t } = useTranslation();
  const { colors, spacing, typography } = useTheme();
  const { setAuthSession } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const data = await authApi.register({ firstName, lastName, email, password });
      setAuthSession(data.user, data.tokens);
    } catch {
      // Error handled
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
    >
      <View style={styles.header}>
        <Text style={[typography.h2, { color: colors.textPrimary, marginBottom: spacing.xs }]}>
          Make the most of your professional life
        </Text>
      </View>

      <TextInput label="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput label="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput
        label={t('auth.email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <PasswordInput label={t('auth.password')} value={password} onChangeText={setPassword} />

      <PrimaryButton
        title={t('auth.register')}
        onPress={handleRegister}
        isLoading={loading}
        style={{ marginTop: spacing.md, marginBottom: spacing.md }}
      />
      <SecondaryButton title="Already have an account? Sign In" onPress={onNavigateToLogin} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
  },
});
