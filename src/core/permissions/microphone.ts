import { Platform } from 'react-native';
import { PermissionStatus } from './camera';

export class MicrophonePermissionHandler {
  public static async request(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';
    console.log('[MicrophonePermission] Requesting microphone access');
    return 'GRANTED';
  }

  public static async check(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'GRANTED';
    return 'GRANTED';
  }
}
