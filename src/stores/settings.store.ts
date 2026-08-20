import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { zustandMMKVStorage } from '../services/storage/mmkv.storage';

interface SettingsState {
  language: string;
  isBiometricsEnabled: boolean;
  pushNotificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  setLanguage: (lang: string) => void;
  setBiometricsEnabled: (enabled: boolean) => void;
  setPushNotificationsEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      isBiometricsEnabled: false,
      pushNotificationsEnabled: true,
      emailNotificationsEnabled: true,

      setLanguage: (lang) =>
        set(
          produce((state: SettingsState) => {
            state.language = lang;
          })
        ),

      setBiometricsEnabled: (enabled) =>
        set(
          produce((state: SettingsState) => {
            state.isBiometricsEnabled = enabled;
          })
        ),

      setPushNotificationsEnabled: (enabled) =>
        set(
          produce((state: SettingsState) => {
            state.pushNotificationsEnabled = enabled;
          })
        ),
    }),
    {
      name: STORAGE_KEYS.SETTINGS_STORE,
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
