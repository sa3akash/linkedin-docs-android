import { PermissionsAndroid, Platform } from 'react-native';
import { PermissionStatus } from './camera';

export class BluetoothPermissionHandler {
  public static async request(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'UNSUPPORTED';

    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 31) {
          const granted = await PermissionsAndroid.request(
            (PermissionsAndroid.PERMISSIONS as any).BLUETOOTH_CONNECT || 'android.permission.BLUETOOTH_CONNECT',
            {
              title: 'Bluetooth Permission',
              message: 'This app needs Bluetooth access to connect to external audio devices.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED ? 'GRANTED' : 'DENIED';
        }
        return 'GRANTED';
      } catch (err) {
        console.warn('[BluetoothPermission] Request error:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }

  public static async check(): Promise<PermissionStatus> {
    if (Platform.OS === 'web') return 'UNSUPPORTED';

    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 31) {
          const hasPermission = await PermissionsAndroid.check(
            (PermissionsAndroid.PERMISSIONS as any).BLUETOOTH_CONNECT || 'android.permission.BLUETOOTH_CONNECT'
          );
          return hasPermission ? 'GRANTED' : 'DENIED';
        }
        return 'GRANTED';
      } catch (err) {
        console.warn('[BluetoothPermission] Check error:', err);
        return 'DENIED';
      }
    }

    return 'GRANTED';
  }
}
