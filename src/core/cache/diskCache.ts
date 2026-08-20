import { mmkvStorage } from '../../services/storage/mmkv.storage';

export class DiskCache {
  public static setBlob(key: string, base64Blob: string): void {
    mmkvStorage.setItem(`disk_${key}`, base64Blob);
  }

  public static getBlob(key: string): string | null {
    return mmkvStorage.getItem(`disk_${key}`);
  }

  public static deleteBlob(key: string): void {
    mmkvStorage.removeItem(`disk_${key}`);
  }
}
