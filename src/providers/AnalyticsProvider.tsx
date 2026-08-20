import React, { useEffect } from 'react';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { useAuth } from '../hooks/useAuth';

export interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      AnalyticsService.setUserContext(user.id, { email: user.email });
    }
  }, [user]);

  return <>{children}</>;
};
