import { mmkvStorage } from '../../services/storage/mmkv.storage';
import { DraftType } from '../drafts/draftService';

export interface RecoveredSession {
  lastRoute: string;
  activeDraftKeys: Array<{ type: DraftType; targetId: string }>;
  timestamp: string;
  isCrashRecovery: boolean;
}

export class CrashRecoveryManager {
  private static CRASH_SESSION_KEY = 'app_crash_session_snapshot';
  private static CRASH_FLAG_KEY = 'app_did_crash_flag';

  public static recordSessionState(
    lastRoute: string,
    activeDraftKeys: Array<{ type: DraftType; targetId: string }> = []
  ): void {
    const session: RecoveredSession = {
      lastRoute,
      activeDraftKeys,
      timestamp: new Date().toISOString(),
      isCrashRecovery: true,
    };

    mmkvStorage.setItem(CrashRecoveryManager.CRASH_SESSION_KEY, JSON.stringify(session));
    mmkvStorage.setItem(CrashRecoveryManager.CRASH_FLAG_KEY, 'true');
  }

  public static checkAndRestoreCrashSession(): RecoveredSession | null {
    const didCrash = mmkvStorage.getItem(CrashRecoveryManager.CRASH_FLAG_KEY) === 'true';
    if (!didCrash) return null;

    const rawSession = mmkvStorage.getItem(CrashRecoveryManager.CRASH_SESSION_KEY);
    if (!rawSession) return null;

    try {
      const session = JSON.parse(rawSession) as RecoveredSession;
      console.log('[CrashRecovery] Recovered previous session from crash:', session);
      return session;
    } catch {
      return null;
    }
  }

  public static clearCrashSession(): void {
    mmkvStorage.removeItem(CrashRecoveryManager.CRASH_SESSION_KEY);
    mmkvStorage.setItem(CrashRecoveryManager.CRASH_FLAG_KEY, 'false');
  }
}
