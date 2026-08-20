import { Linking, Platform } from 'react-native';

export type UpdateType = 'NONE' | 'SOFT_UPDATE' | 'FORCE_UPDATE' | 'MAINTENANCE_MODE';

export interface AppVersionConfig {
  currentVersion: string;
  minimumVersion: string;
  latestVersion: string;
  isMaintenanceMode: boolean;
  maintenanceMessage?: string;
  storeUrlAndroid?: string;
  storeUrlIos?: string;
}

export class AppUpdateService {
  private static PLAY_STORE_URL = 'market://details?id=com.linkedin.enterprise';
  private static APP_STORE_URL = 'https://apps.apple.com/app/id123456789';

  public static compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    const length = Math.max(parts1.length, parts2.length);

    for (let i = 0; i < length; i++) {
      const num1 = parts1[i] || 0;
      const num2 = parts2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  }

  public static evaluateUpdateRequirement(config: AppVersionConfig): UpdateType {
    if (config.isMaintenanceMode) {
      return 'MAINTENANCE_MODE';
    }

    if (AppUpdateService.compareVersions(config.currentVersion, config.minimumVersion) < 0) {
      return 'FORCE_UPDATE';
    }

    if (AppUpdateService.compareVersions(config.currentVersion, config.latestVersion) < 0) {
      return 'SOFT_UPDATE';
    }

    return 'NONE';
  }

  public static async redirectToStore(customAndroidUrl?: string, customIosUrl?: string): Promise<void> {
    const url = Platform.OS === 'ios' ? customIosUrl || AppUpdateService.APP_STORE_URL : customAndroidUrl || AppUpdateService.PLAY_STORE_URL;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        const fallbackWeb = Platform.OS === 'ios' ? AppUpdateService.APP_STORE_URL : 'https://play.google.com/store/apps/details?id=com.linkedin.enterprise';
        await Linking.openURL(fallbackWeb);
      }
    } catch (err) {
      console.warn('[AppUpdateService] Failed to open store link:', err);
    }
  }
}
