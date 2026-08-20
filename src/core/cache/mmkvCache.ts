import { mmkvStorage } from '../../services/storage/mmkv.storage';

export class MMKVCache {
  public static set<T>(key: string, value: T): void {
    mmkvStorage.setItem(`mmkv_${key}`, JSON.stringify(value));
  }

  public static get<T>(key: string): T | null {
    const raw = mmkvStorage.getItem(`mmkv_${key}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  public static delete(key: string): void {
    mmkvStorage.removeItem(`mmkv_${key}`);
  }
}
