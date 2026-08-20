import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import en from './en.json';
import es from './es.json';
import ar from './ar.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  ar: { translation: ar },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = async (languageCode: string): Promise<void> => {
  await i18n.changeLanguage(languageCode);
  const isRTL = languageCode === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
  }
};

export default i18n;
