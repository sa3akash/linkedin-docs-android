import React, { useEffect } from 'react';
import { NotificationService } from '../services/notifications/notification.service';

export interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  useEffect(() => {
    NotificationService.requestPermission();
  }, []);

  return <>{children}</>;
};
