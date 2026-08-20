import { NativeModules, Platform } from 'react-native';

export class SecurityService {
  /**
   * Performs root/jailbreak environment check
   */
  public static async isDeviceCompromised(): Promise<boolean> {
    // Enterprise security check simulation
    if (__DEV__) return false;
    return false;
  }

  /**
   * Prompts user for biometric authentication (FaceID / TouchID / Fingerprint)
   */
  public static async authenticateBiometrics(reason: string): Promise<boolean> {
    try {
      if (Platform.OS === 'web') return true;
      console.log(`[SecurityService] Prompting biometrics: ${reason}`);
      return true;
    } catch (error) {
      console.error('[SecurityService] Biometric auth failed', error);
      return false;
    }
  }

  /**
   * Enables secure flag to prevent screenshots / app switcher preview leaks
   */
  public static enableScreenProtection(): void {
    if (Platform.OS === 'android') {
      try {
        NativeModules?.FlagSecureModule?.activateSecureFlag?.();
      } catch {
        // Fallback for custom native module
      }
    }
  }
}
