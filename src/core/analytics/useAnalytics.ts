import { useCallback } from 'react';
import { AnalyticsService } from './analyticsService';

export const useAnalytics = () => {
  const trackLogin = useCallback((userId: string, method = 'password') => {
    AnalyticsService.trackLogin(userId, method);
  }, []);

  const trackLogout = useCallback((userId: string) => {
    AnalyticsService.trackLogout(userId);
  }, []);

  const trackRegistration = useCallback((userId: string, email: string) => {
    AnalyticsService.trackRegistration(userId, email);
  }, []);

  const trackPostViewed = useCallback((postId: string, authorId: string) => {
    AnalyticsService.trackPostViewed(postId, authorId);
  }, []);

  const trackPostClicked = useCallback((postId: string) => {
    AnalyticsService.trackPostClicked(postId);
  }, []);

  const trackPostShared = useCallback((postId: string, platform?: string) => {
    AnalyticsService.trackPostShared(postId, platform);
  }, []);

  const trackJobViewed = useCallback((jobId: string, companyName: string) => {
    AnalyticsService.trackJobViewed(jobId, companyName);
  }, []);

  const trackJobApplied = useCallback((jobId: string) => {
    AnalyticsService.trackJobApplied(jobId);
  }, []);

  const trackMessageSent = useCallback((conversationId: string, messageId: string) => {
    AnalyticsService.trackMessageSent(conversationId, messageId);
  }, []);

  const trackMessageRead = useCallback((conversationId: string, messageId: string) => {
    AnalyticsService.trackMessageRead(conversationId, messageId);
  }, []);

  return {
    trackLogin,
    trackLogout,
    trackRegistration,
    trackPostViewed,
    trackPostClicked,
    trackPostShared,
    trackJobViewed,
    trackJobApplied,
    trackMessageSent,
    trackMessageRead,
  };
};
