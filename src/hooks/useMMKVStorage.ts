import { useState, useCallback, useEffect } from 'react';
import { mmkvStorage } from '../services/storage/mmkv.storage';

export function useMMKVStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = mmkvStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const item = mmkvStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`[useMMKVStorage] Error reading key: ${key}`, error);
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        mmkvStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`[useMMKVStorage] Error writing key: ${key}`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      mmkvStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`[useMMKVStorage] Error removing key: ${key}`, error);
    }
  }, [initialValue, key]);

  return [storedValue, setValue, removeValue];
}
