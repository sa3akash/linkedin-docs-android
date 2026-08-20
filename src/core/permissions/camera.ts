import { PermissionsAndroid, Platform } from 'react-native';

export type PermissionStatus = 'GRANTED' | 'DENIED' | 'BLOCKED' | 'UNSUPPORTED';

export class CameraPermissionHandler {
  public static async request(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to capture posts and profile photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED ? 'GRANTED' : 'DENIED';
      } catch (err) {
        console.warn('[CameraPermission] Request error:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }

  public static async check(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';

    if (Platform.OS === 'android') {
      try {
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        return hasPermission ? 'GRANTED' : 'DENIED';
      } catch (err) {
        console.warn('[CameraPermission] Check error:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }
}
