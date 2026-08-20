import React, { memo, useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { VideoPipeline, VideoStreamConfig } from '../../core/media/videoPipeline';

export interface EnterpriseVideoPlayerProps {
  url: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  enablePiP?: boolean;
  enableBackgroundPlayback?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const EnterpriseVideoPlayer: React.FC<EnterpriseVideoPlayerProps> = memo(({
  url,
  autoPlay = true,
  loop = false,
  muted = false,
  enablePiP = true,
  enableBackgroundPlayback = false,
  style,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isBuffering] = useState(false);
  const [isPiPActive, setIsPiPActive] = useState(false);

  const configRef = useRef<VideoStreamConfig>(
    VideoPipeline.createPlayerConfig(url, {
      autoPlay,
      loop,
      muted,
      pictureInPicture: enablePiP,
      backgroundPlayback: enableBackgroundPlayback,
    })
  );

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const togglePiP = useCallback(() => {
    const nextState = !isPiPActive;
    setIsPiPActive(nextState);
    VideoPipeline.enablePictureInPicture(nextState);
  }, [isPiPActive]);

  return (
    <View style={[styles.container, style]}>
      {/* Video Surface Simulation */}
      <View style={styles.surface}>
        {isBuffering && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0A66C2" />
          </View>
        )}

        {/* Video Overlay Controls */}
        <View style={styles.overlay}>
          <Text style={styles.badgeText}>{configRef.current.type} Stream</Text>

          <TouchableOpacity style={styles.playBtn} onPress={togglePlayPause}>
            <Text style={styles.playBtnText}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>

          {enablePiP && (
            <TouchableOpacity style={styles.pipBtn} onPress={togglePiP}>
              <Text style={styles.pipBtnText}>{isPiPActive ? 'Exit PiP' : 'PiP'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    backgroundColor: '#000000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  surface: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeText: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  playBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnText: {
    fontSize: 20,
    color: '#000000',
  },
  pipBtn: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  pipBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
