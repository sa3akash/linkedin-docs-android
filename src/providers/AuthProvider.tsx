import React, { useEffect } from 'react';
import { setupInterceptors } from '../services/api/interceptors';
import { useAuth } from '../hooks/useAuth';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { logout } = useAuth();

  useEffect(() => {
    setupInterceptors(() => {
      logout();
    });
  }, [logout]);

  return <>{children}</>;
};
