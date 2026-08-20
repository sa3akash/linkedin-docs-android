import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { ThemeMode } from '../theme';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { zustandMMKVStorage } from '../services/storage/mmkv.storage';

interface ThemeState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeMode: 'system',
      setThemeMode: (mode) =>
        set(
          produce((state: ThemeState) => {
            state.themeMode = mode;
          })
        ),
    }),
    {
      name: STORAGE_KEYS.THEME_STORE,
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
