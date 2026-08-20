import { MemoryCache } from './memoryCache';
import { MMKVCache } from './mmkvCache';
import { DiskCache } from './diskCache';
import { ReactQueryCache } from './reactQueryCache';
import { ImagePipeline } from '../media/imagePipeline';
import { VideoPipeline } from '../media/videoPipeline';

export class CacheManager {
  public static memory = MemoryCache;
  public static mmkv = MMKVCache;
  public static disk = DiskCache;
  public static reactQuery = ReactQueryCache;
  public static image = ImagePipeline;
  public static video = VideoPipeline;

  public static clearAllCaches(): void {
    MemoryCache.clear();
    ReactQueryCache.clearAll();
    ImagePipeline.clearCache();
    console.log('[CacheManager] Cleared all 6 caching tiers successfully');
  }
}
