import { useState, useEffect } from 'react';
import { mmkvStorage } from '../../services/storage/mmkv.storage';

export type FeatureFlagKey =
  | 'enable_ai_suggestions'
  | 'enable_video_reels'
  | 'enable_job_salary_insights'
  | 'enable_dark_mode_v2'
  | 'ab_test_feed_algorithm';

export interface FeatureFlagValue {
  enabled: boolean;
  variant?: string;
}

export class FeatureFlagManager {
  private static flags: Map<FeatureFlagKey, FeatureFlagValue> = new Map([
    ['enable_ai_suggestions', { enabled: true, variant: 'v1' }],
    ['enable_video_reels', { enabled: true }],
    ['enable_job_salary_insights', { enabled: false }],
    ['enable_dark_mode_v2', { enabled: true }],
    ['ab_test_feed_algorithm', { enabled: true, variant: 'chronological' }],
  ]);

  public static isEnabled(key: FeatureFlagKey): boolean {
    const cached = mmkvStorage.getItem(`ff_${key}`);
    if (cached !== null) {
      return cached === 'true';
    }
    return FeatureFlagManager.flags.get(key)?.enabled ?? false;
  }

  public static getVariant(key: FeatureFlagKey): string | undefined {
    return FeatureFlagManager.flags.get(key)?.variant;
  }

  public static setOverride(key: FeatureFlagKey, enabled: boolean): void {
    mmkvStorage.setItem(`ff_${key}`, String(enabled));
  }
}

export const useFeatureFlag = (key: FeatureFlagKey): FeatureFlagValue => {
  const [flagValue, setFlagValue] = useState<FeatureFlagValue>({
    enabled: FeatureFlagManager.isEnabled(key),
    variant: FeatureFlagManager.getVariant(key),
  });

  useEffect(() => {
    setFlagValue({
      enabled: FeatureFlagManager.isEnabled(key),
      variant: FeatureFlagManager.getVariant(key),
    });
  }, [key]);

  return flagValue;
};
