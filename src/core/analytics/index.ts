export type AnalyticsEventType =
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'USER_REGISTER'
  | 'POST_VIEWED'
  | 'POST_CLICKED'
  | 'POST_SHARED'
  | 'JOB_VIEWED'
  | 'JOB_APPLIED'
  | 'MESSAGE_SENT'
  | 'MESSAGE_READ';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  payload?: Record<string, unknown>;
  timestamp: string;
}

export class AnalyticsService {
  private static events: AnalyticsEvent[] = [];

  public static trackEvent(type: AnalyticsEventType, payload?: Record<string, unknown>): void {
    const event: AnalyticsEvent = {
      type,
      payload,
      timestamp: new Date().toISOString(),
    };

    AnalyticsService.events.push(event);
    console.log(`[Analytics] Tracked '${type}':`, payload || '');
  }

  public static getEvents(): AnalyticsEvent[] {
    return [...AnalyticsService.events];
  }
}
