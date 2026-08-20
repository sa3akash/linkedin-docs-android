import { PermissionsAndroid, Platform } from 'react-native';
import { PermissionStatus } from './camera';

export class CalendarPermissionHandler {
  public static async request(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'UNSUPPORTED';

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
          {
            title: 'Calendar Permission',
            message: 'This app needs access to your calendar to schedule interview events and reminders.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED ? 'GRANTED' : 'DENIED';
      } catch (err) {
        console.warn('[CalendarPermission] Request error:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }

  public static async check(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'UNSUPPORTED';

    if (Platform.OS === 'android') {
      try {
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CALENDAR);
        return hasPermission ? 'GRANTED' : 'DENIED';
      } catch (err) {
        console.warn('[CalendarPermission] Check error:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }
}
