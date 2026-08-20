export class AnalyticsService {
  public static logScreenView(screenName: string, screenClass?: string): void {
    console.log(`[Analytics] Screen View: ${screenName} (${screenClass || 'Screen'})`);
  }

  public static logEvent(eventName: string, params?: Record<string, unknown>): void {
    console.log(`[Analytics] Event logged: ${eventName}`, params || {});
  }

  public static setUserContext(userId: string, userProperties?: Record<string, string>): void {
    console.log(`[Analytics] User context set: ${userId}`, userProperties || {});
  }
}
