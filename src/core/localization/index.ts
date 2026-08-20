export type SupportedLocale = 'en' | 'es' | 'fr' | 'ar';

export const TRANSLATIONS: Record<SupportedLocale, Record<string, string>> = {
  en: {
    welcome: 'Welcome back to LinkedIn',
    login: 'Sign In',
    register: 'Join Now',
    feed: 'Home Feed',
    jobs: 'Jobs',
    chat: 'Messaging',
    notifications: 'Notifications',
  },
  es: {
    welcome: 'Bienvenido de nuevo a LinkedIn',
    login: 'Iniciar Sesión',
    register: 'Únete Ahora',
    feed: 'Inicio',
    jobs: 'Empleos',
    chat: 'Mensajes',
    notifications: 'Notificaciones',
  },
  fr: {
    welcome: 'Bienvenue sur LinkedIn',
    login: 'Se connecter',
    register: "S'inscrire",
    feed: 'Accueil',
    jobs: 'Offres d\'emploi',
    chat: 'Messagerie',
    notifications: 'Notifications',
  },
  ar: {
    welcome: 'مرحباً بك في لينكد إن',
    login: 'تسجيل الدخول',
    register: 'انضم الآن',
    feed: 'الرئيسية',
    jobs: 'الوظائف',
    chat: 'الرسائل',
    notifications: 'الإشعارات',
  },
};

export class LocalizationManager {
  private static currentLocale: SupportedLocale = 'en';

  public static setLocale(locale: SupportedLocale): void {
    LocalizationManager.currentLocale = locale;
  }

  public static getLocale(): SupportedLocale {
    return LocalizationManager.currentLocale;
  }

  public static translate(key: string): string {
    const dict = TRANSLATIONS[LocalizationManager.currentLocale] || TRANSLATIONS.en;
    return dict[key] || key;
  }
}
