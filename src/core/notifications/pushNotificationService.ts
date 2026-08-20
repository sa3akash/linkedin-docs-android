export interface PushNotificationPayload {
  id: string;
  title: string;
  body: string;
  deepLink?: string;
  data?: Record<string, string>;
}

export class PushNotificationService {
  private static token: string | null = null;
  private static listeners: Array<(notification: PushNotificationPayload) => void> = [];

  public static async registerDeviceToken(): Promise<string> {
    const token = `device_token_${Math.random().toString(36).substr(2, 9)}`;
    PushNotificationService.token = token;
    console.log('[PushNotificationService] Device token registered:', token);
    return token;
  }

  public static getToken(): string | null {
    return PushNotificationService.token;
  }

  public static onNotificationReceived(
    callback: (notification: PushNotificationPayload) => void
  ): () => void {
    PushNotificationService.listeners.push(callback);
    return () => {
      PushNotificationService.listeners = PushNotificationService.listeners.filter((cb) => cb !== callback);
    };
  }

  public static handleNotificationPayload(notification: PushNotificationPayload): void {
    PushNotificationService.listeners.forEach((cb) => cb(notification));
  }
}
