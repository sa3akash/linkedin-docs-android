import { PermissionsAndroid, Platform } from 'react-native';
import { PermissionStatus } from './camera';

export class PhotosPermissionHandler {
  public static async request(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';

    if (Platform.OS === 'android') {
      try {
        const permission =
          Platform.Version >= 33
            ? (PermissionsAndroid.PERMISSIONS as any).READ_MEDIA_IMAGES || PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Photos Permission',
          message: 'This app needs access to your photos to upload media attachments.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        return granted === PermissionsAndroid.RESULTS.GRANTED ? 'GRANTED' : 'DENIED';
      } catch (err) {
        console.warn('[PhotosPermission] Request error:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }

  public static async check(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';

    if (Platform.OS === 'android') {
      try {
        const permission =
          Platform.Version >= 33
            ? (PermissionsAndroid.PERMISSIONS as any).READ_MEDIA_IMAGES || PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        return hasPermission ? 'GRANTED' : 'DENIED';
      } catch (err) {
        console.warn('[PhotosPermission] Check error:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }
}
