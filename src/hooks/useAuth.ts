import { useAuthStore } from '../stores/auth.store';

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isBiometricAuthenticated = useAuthStore((state) => state.isBiometricAuthenticated);
  const setAuthSession = useAuthStore((state) => state.setAuthSession);
  const updateUser = useAuthStore((state) => state.updateUser);
  const setBiometricAuthenticated = useAuthStore((state) => state.setBiometricAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return {
    user,
    tokens,
    isAuthenticated,
    isBiometricAuthenticated,
    setAuthSession,
    updateUser,
    setBiometricAuthenticated,
    logout,
  };
};
