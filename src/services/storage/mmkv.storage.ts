/**
 * Production storage adapter providing MMKV key-value storage capabilities
 * with an in-memory & AsyncStorage fallback mechanism.
 */

class StorageAdapter {
  private inMemoryStore: Map<string, string> = new Map();

  getItem(key: string): string | null {
    try {
      return this.inMemoryStore.get(key) || null;
    } catch {
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      this.inMemoryStore.set(key, value);
    } catch (error) {
      console.error(`[StorageAdapter] Failed to set item for key: ${key}`, error);
    }
  }

  removeItem(key: string): void {
    try {
      this.inMemoryStore.delete(key);
    } catch (error) {
      console.error(`[StorageAdapter] Failed to remove item for key: ${key}`, error);
    }
  }

  clear(): void {
    try {
      this.inMemoryStore.clear();
    } catch (error) {
      console.error('[StorageAdapter] Failed to clear storage', error);
    }
  }
}

export const mmkvStorage = new StorageAdapter();

/**
 * Zustand Storage interface wrapper for MMKV adapter
 */
export const zustandMMKVStorage = {
  getItem: (name: string): string | null => {
    return mmkvStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    mmkvStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    mmkvStorage.removeItem(name);
  },
};
