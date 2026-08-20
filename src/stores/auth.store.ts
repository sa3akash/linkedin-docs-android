import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { UserProfile } from '../types/user.types';
import { AuthTokens } from '../types/auth.types';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { zustandMMKVStorage } from '../services/storage/mmkv.storage';

interface AuthState {
  user: UserProfile | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isBiometricAuthenticated: boolean;
  setAuthSession: (user: UserProfile, tokens: AuthTokens) => void;
  updateUser: (partialUser: Partial<UserProfile>) => void;
  setBiometricAuthenticated: (status: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isBiometricAuthenticated: false,

      setAuthSession: (user, tokens) =>
        set(
          produce((state: AuthState) => {
            state.user = user;
            state.tokens = tokens;
            state.isAuthenticated = true;
            state.isBiometricAuthenticated = false;
          })
        ),

      updateUser: (partialUser) =>
        set(
          produce((state: AuthState) => {
            if (state.user) {
              Object.assign(state.user, partialUser);
            }
          })
        ),

      setBiometricAuthenticated: (status) =>
        set(
          produce((state: AuthState) => {
            state.isBiometricAuthenticated = status;
          })
        ),

      logout: () =>
        set(
          produce((state: AuthState) => {
            state.user = null;
            state.tokens = null;
            state.isAuthenticated = false;
            state.isBiometricAuthenticated = false;
          })
        ),
    }),
    {
      name: STORAGE_KEYS.AUTH_STORE,
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
