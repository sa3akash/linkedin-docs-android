export class MemoryCache {
  private static cache: Map<string, { value: any; expiresAt?: number }> = new Map();

  public static set<T>(key: string, value: T, ttlMs?: number): void {
    const expiresAt = ttlMs ? Date.now() + ttlMs : undefined;
    MemoryCache.cache.set(key, { value, expiresAt });
  }

  public static get<T>(key: string): T | null {
    const item = MemoryCache.cache.get(key);
    if (!item) return null;

    if (item.expiresAt && Date.now() > item.expiresAt) {
      MemoryCache.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  public static delete(key: string): void {
    MemoryCache.cache.delete(key);
  }

  public static clear(): void {
    MemoryCache.cache.clear();
  }
}
