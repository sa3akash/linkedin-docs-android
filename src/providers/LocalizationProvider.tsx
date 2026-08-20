import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { changeLanguage } from '../localization/i18n';
import { useSettingsStore } from '../stores/settings.store';

export interface LocalizationProviderProps {
  children: React.ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const language = useSettingsStore((state) => state.language);

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
