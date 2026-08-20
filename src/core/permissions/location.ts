import { PermissionsAndroid, Platform } from 'react-native';
import { PermissionStatus } from './camera';

export class LocationPermissionHandler {
  public static async request(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your device location for local jobs and network features.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED ? 'GRANTED' : 'DENIED';
      } catch (err) {
        console.warn('[LocationPermission] Error requesting location permission:', err);
        return 'DENIED';
      }
    }

    // iOS native permission fallback
    return 'GRANTED';
  }

  public static async check(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';

    if (Platform.OS === 'android') {
      try {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return hasPermission ? 'GRANTED' : 'DENIED';
      } catch (err) {
        console.warn('[LocationPermission] Error checking location permission:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }
}
