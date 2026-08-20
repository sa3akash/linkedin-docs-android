import { mmkvStorage } from '../../services/storage/mmkv.storage';

export type VideoStreamType = 'HLS' | 'DASH' | 'PROGRESSIVE';

export interface VideoStreamConfig {
  uri: string;
  type: VideoStreamType;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  backgroundPlayback?: boolean;
  pictureInPicture?: boolean;
  bitrate?: number; // Adaptive Bitrate in bps
}

export class VideoPipeline {
  private static VIDEO_CACHE_PREFIX = 'vid_cache_';

  public static detectStreamType(url: string): VideoStreamType {
    if (url.includes('.m3u8')) return 'HLS';
    if (url.includes('.mpd')) return 'DASH';
    return 'PROGRESSIVE';
  }

  public static createPlayerConfig(url: string, options: Partial<VideoStreamConfig> = {}): VideoStreamConfig {
    const type = VideoPipeline.detectStreamType(url);
    return {
      uri: url,
      type,
      autoPlay: options.autoPlay ?? true,
      loop: options.loop ?? false,
      muted: options.muted ?? false,
      backgroundPlayback: options.backgroundPlayback ?? false,
      pictureInPicture: options.pictureInPicture ?? true,
      bitrate: options.bitrate || 2500000, // 2.5 Mbps default
    };
  }

  public static isCached(url: string): boolean {
    const key = `${VideoPipeline.VIDEO_CACHE_PREFIX}${encodeURIComponent(url)}`;
    return mmkvStorage.getItem(key) !== null;
  }

  public static cacheVideoUrl(url: string, localCachePath: string): void {
    const key = `${VideoPipeline.VIDEO_CACHE_PREFIX}${encodeURIComponent(url)}`;
    mmkvStorage.setItem(key, localCachePath);
  }

  public static enablePictureInPicture(enabled: boolean): void {
    console.log(`[VideoPipeline] Picture-in-Picture mode: ${enabled ? 'ENABLED' : 'DISABLED'}`);
  }

  public static enableBackgroundPlayback(enabled: boolean): void {
    console.log(`[VideoPipeline] Background audio playback: ${enabled ? 'ENABLED' : 'DISABLED'}`);
  }
}
