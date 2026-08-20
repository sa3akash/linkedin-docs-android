import { mmkvStorage } from '../../services/storage/mmkv.storage';

export interface CrashSessionData {
  lastRoute?: string;
  activeDraftId?: string;
  timestamp: string;
}

export class CrashRecoveryManager {
  private static CRASH_SESSION_KEY = 'app_crash_session';

  public static recordSessionState(route: string, draftId?: string): void {
    const session: CrashSessionData = {
      lastRoute: route,
      activeDraftId: draftId,
      timestamp: new Date().toISOString(),
    };
    mmkvStorage.setItem(CrashRecoveryManager.CRASH_SESSION_KEY, JSON.stringify(session));
  }

  public static getPreviousSession(): CrashSessionData | null {
    const raw = mmkvStorage.getItem(CrashRecoveryManager.CRASH_SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as CrashSessionData;
    } catch {
      return null;
    }
  }

  public static clearSessionState(): void {
    mmkvStorage.removeItem(CrashRecoveryManager.CRASH_SESSION_KEY);
  }
}
