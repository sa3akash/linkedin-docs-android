export interface VideoPlayerConfig {
  uri: string;
  isHls?: boolean;
  isDash?: boolean;
  autoPlay?: boolean;
  isLooping?: boolean;
  enablePiP?: boolean;
}

export interface ImagePipelineConfig {
  uri: string;
  blurHash?: string;
  thumbnailUri?: string;
  cacheKey?: string;
}

export class MediaPipeline {
  public static getVideoConfig(url: string): VideoPlayerConfig {
    const isHls = url.endsWith('.m3u8');
    const isDash = url.endsWith('.mpd');

    return {
      uri: url,
      isHls,
      isDash,
      autoPlay: true,
      isLooping: false,
      enablePiP: true,
    };
  }

  public static getImageConfig(url: string, blurHash?: string): ImagePipelineConfig {
    return {
      uri: url,
      blurHash,
      cacheKey: `img_${url.split('/').pop()}`,
    };
  }
}
