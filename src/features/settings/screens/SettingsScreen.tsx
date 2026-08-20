import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../hooks/useAuth';
import { useSettingsStore } from '../../../stores/settings.store';
import { PrimaryButton, ConfirmationModal } from '../../../components';
import { ThemeMode } from '../../../theme';

export const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors, spacing, radius, typography, mode, setThemeMode } = useTheme();
  const { logout } = useAuth();
  const { language, setLanguage, isBiometricsEnabled, setBiometricsEnabled } = useSettingsStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const themeModes: { label: string; value: ThemeMode }[] = [
    { label: 'Light Theme', value: 'light' },
    { label: 'Dark Theme', value: 'dark' },
    { label: 'AMOLED Pure Black', value: 'amoled' },
    { label: 'System Default', value: 'system' },
  ];

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'العربية (RTL)', value: 'ar' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      {/* Theme Section */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: radius.md,
            padding: spacing.lg,
            marginBottom: spacing.lg,
          },
        ]}
      >
        <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.md }]}>
          🎨 {t('settings.theme')}
        </Text>
        {themeModes.map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => setThemeMode(item.value)}
            style={[
              styles.row,
              styles.borderRow,
              {
                paddingVertical: spacing.md,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <Text style={[typography.body1, { color: colors.textPrimary }]}>{item.label}</Text>
            <Text style={[typography.subtitle2, { color: mode === item.value ? colors.primary : colors.textMuted }]}>
              {mode === item.value ? '✓ Active' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Language Section */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: radius.md,
            padding: spacing.lg,
            marginBottom: spacing.lg,
          },
        ]}
      >
        <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.md }]}>
          🌐 {t('settings.language')}
        </Text>
        {languages.map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => setLanguage(item.value)}
            style={[
              styles.row,
              styles.borderRow,
              {
                paddingVertical: spacing.md,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <Text style={[typography.body1, { color: colors.textPrimary }]}>{item.label}</Text>
            <Text style={[typography.subtitle2, { color: language === item.value ? colors.primary : colors.textMuted }]}>
              {language === item.value ? '✓ Active' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Security & Biometrics */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: radius.md,
            padding: spacing.lg,
            marginBottom: spacing.xl,
          },
        ]}
      >
        <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.md }]}>
          🔒 Security & Biometrics
        </Text>
        <View style={styles.row}>
          <Text style={[typography.body1, { color: colors.textPrimary }]}>
            {t('settings.biometrics')}
          </Text>
          <Switch
            value={isBiometricsEnabled}
            onValueChange={setBiometricsEnabled}
            thumbColor={isBiometricsEnabled ? colors.primary : colors.border}
          />
        </View>
      </View>

      {/* Sign Out Button */}
      <PrimaryButton
        title={t('settings.logout')}
        onPress={() => setShowLogoutModal(true)}
        style={{ backgroundColor: colors.error, marginBottom: spacing.xxl }}
      />

      <ConfirmationModal
        visible={showLogoutModal}
        title="Sign Out"
        message="Are you sure you want to sign out of LinkedIn?"
        confirmText="Sign Out"
        cancelText="Cancel"
        isDestructive
        onConfirm={() => {
          setShowLogoutModal(false);
          logout();
        }}
        onCancel={() => setShowLogoutModal(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  borderRow: {
    borderBottomWidth: 0.5,
  },
});
