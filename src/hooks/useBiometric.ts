import { useCallback } from 'react';
import { SecurityService } from '../services/security/security.service';
import { useAuth } from './useAuth';

export const useBiometric = () => {
  const { setBiometricAuthenticated } = useAuth();

  const authenticate = useCallback(async (reason = 'Unlock application'): Promise<boolean> => {
    const success = await SecurityService.authenticateBiometrics(reason);
    if (success) {
      setBiometricAuthenticated(true);
    }
    return success;
  }, [setBiometricAuthenticated]);

  return {
    authenticate,
  };
};
