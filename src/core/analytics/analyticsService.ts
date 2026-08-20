import { mmkvStorage } from '../../services/storage/mmkv.storage';

export type UserAnalyticsEvent = 'USER_LOGIN' | 'USER_LOGOUT' | 'USER_REGISTER';
export type FeedAnalyticsEvent = 'POST_VIEWED' | 'POST_CLICKED' | 'POST_SHARED';
export type JobAnalyticsEvent = 'JOB_VIEWED' | 'JOB_APPLIED';
export type MessagingAnalyticsEvent = 'MESSAGE_SENT' | 'MESSAGE_READ';

export type AnalyticsEventType =
  | UserAnalyticsEvent
  | FeedAnalyticsEvent
  | JobAnalyticsEvent
  | MessagingAnalyticsEvent;

export interface AnalyticsEventRecord {
  id: string;
  type: AnalyticsEventType;
  payload?: Record<string, string | number | boolean>;
  timestamp: string;
}

export class AnalyticsService {
  private static STORAGE_KEY = 'analytics_event_queue';
  private static events: AnalyticsEventRecord[] = [];

  public static trackEvent(
    type: AnalyticsEventType,
    payload?: Record<string, string | number | boolean>
  ): void {
    const record: AnalyticsEventRecord = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type,
      payload,
      timestamp: new Date().toISOString(),
    };

    AnalyticsService.events.push(record);
    console.log(`[AnalyticsService] Tracked '${type}':`, payload || '');

    AnalyticsService.persistQueue();
  }

  // User Events
  public static trackLogin(userId: string, method: string): void {
    AnalyticsService.trackEvent('USER_LOGIN', { userId, method });
  }

  public static trackLogout(userId: string): void {
    AnalyticsService.trackEvent('USER_LOGOUT', { userId });
  }

  public static trackRegistration(userId: string, email: string): void {
    AnalyticsService.trackEvent('USER_REGISTER', { userId, email });
  }

  // Feed Events
  public static trackPostViewed(postId: string, authorId: string): void {
    AnalyticsService.trackEvent('POST_VIEWED', { postId, authorId });
  }

  public static trackPostClicked(postId: string): void {
    AnalyticsService.trackEvent('POST_CLICKED', { postId });
  }

  public static trackPostShared(postId: string, platform?: string): void {
    AnalyticsService.trackEvent('POST_SHARED', { postId, platform: platform || 'internal' });
  }

  // Job Events
  public static trackJobViewed(jobId: string, companyName: string): void {
    AnalyticsService.trackEvent('JOB_VIEWED', { jobId, companyName });
  }

  public static trackJobApplied(jobId: string): void {
    AnalyticsService.trackEvent('JOB_APPLIED', { jobId });
  }

  // Messaging Events
  public static trackMessageSent(conversationId: string, messageId: string): void {
    AnalyticsService.trackEvent('MESSAGE_SENT', { conversationId, messageId });
  }

  public static trackMessageRead(conversationId: string, messageId: string): void {
    AnalyticsService.trackEvent('MESSAGE_READ', { conversationId, messageId });
  }

  private static persistQueue(): void {
    mmkvStorage.setItem(AnalyticsService.STORAGE_KEY, JSON.stringify(AnalyticsService.events));
  }
}
