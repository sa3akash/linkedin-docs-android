import { mmkvStorage } from '../../services/storage/mmkv.storage';

export interface ImageCacheConfig {
  uri: string;
  cacheKey?: string;
  blurHash?: string;
  priority?: 'LOW' | 'NORMAL' | 'HIGH';
}

export class ImagePipeline {
  private static CACHE_PREFIX = 'img_cache_';
  private static memoryCache: Map<string, string> = new Map();

  public static getCacheKey(uri: string): string {
    return `${ImagePipeline.CACHE_PREFIX}${encodeURIComponent(uri)}`;
  }

  public static isCached(uri: string): boolean {
    const key = ImagePipeline.getCacheKey(uri);
    if (ImagePipeline.memoryCache.has(key)) return true;
    return mmkvStorage.getItem(key) !== null;
  }

  public static cacheImageUri(uri: string, localPath: string): void {
    const key = ImagePipeline.getCacheKey(uri);
    ImagePipeline.memoryCache.set(key, localPath);
    mmkvStorage.setItem(key, localPath);
  }

  public static getCachedPath(uri: string): string | null {
    const key = ImagePipeline.getCacheKey(uri);
    if (ImagePipeline.memoryCache.has(key)) {
      return ImagePipeline.memoryCache.get(key)!;
    }
    return mmkvStorage.getItem(key);
  }

  public static getDefaultBlurHash(): string {
    return 'LEHV6nWB2yk8x]oJaeoe.wbHwjIA'; // Standard gray gradient BlurHash
  }

  public static clearCache(): void {
    ImagePipeline.memoryCache.clear();
  }
}
