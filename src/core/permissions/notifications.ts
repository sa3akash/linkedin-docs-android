import { PermissionsAndroid, Platform } from 'react-native';
import { PermissionStatus } from './camera';

export class NotificationsPermissionHandler {
  public static async request(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';

    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            (PermissionsAndroid.PERMISSIONS as any).POST_NOTIFICATIONS || 'android.permission.POST_NOTIFICATIONS',
            {
              title: 'Notification Permission',
              message: 'This app needs permission to notify you about messages, job alerts, and connection updates.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED ? 'GRANTED' : 'DENIED';
        }
        return 'GRANTED';
      } catch (err) {
        console.warn('[NotificationsPermission] Request error:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }

  public static async check(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';

    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const hasPermission = await PermissionsAndroid.check(
            (PermissionsAndroid.PERMISSIONS as any).POST_NOTIFICATIONS || 'android.permission.POST_NOTIFICATIONS'
          );
          return hasPermission ? 'GRANTED' : 'DENIED';
        }
        return 'GRANTED';
      } catch (err) {
        console.warn('[NotificationsPermission] Check error:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }
}
