import { useCallback } from 'react';
import { NotificationService } from '../services/notifications/notification.service';

export const useNotification = () => {
  const triggerNotification = useCallback((title: string, body: string, data?: Record<string, unknown>) => {
    NotificationService.displayLocalNotification(title, body, data);
  }, []);

  return {
    triggerNotification,
  };
};
