import { Platform } from 'react-native';

export type PermissionStatus = 'GRANTED' | 'DENIED' | 'BLOCKED' | 'UNSUPPORTED';

export class CameraPermissionHandler {
  public static async request(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';
    console.log('[CameraPermission] Requesting camera access');
    return 'GRANTED';
  }

  public static async check(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';
    return 'GRANTED';
  }
}
