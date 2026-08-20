import React, { useState, memo, useCallback } from 'react';
import { Animated, Image, ImageProps, ImageStyle, StyleProp, StyleSheet, View } from 'react-native';
import { ImagePipeline } from '../../core/media/imagePipeline';

export interface EnterpriseImageProps extends Omit<ImageProps, 'source'> {
  uri: string;
  thumbnailUri?: string;
  blurHash?: string;
  style?: StyleProp<ImageStyle>;
  placeholderColor?: string;
  lazy?: boolean;
}

export const EnterpriseImage: React.FC<EnterpriseImageProps> = memo(({
  uri,
  thumbnailUri,
  blurHash = ImagePipeline.getDefaultBlurHash(),
  style,
  placeholderColor = '#E1E9EE',
  lazy = true,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  const cachedPath = ImagePipeline.getCachedPath(uri);
  const imageSourceUri = cachedPath || uri;

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const handleError = useCallback(() => {
    setIsError(true);
  }, []);

  if (isError || !uri) {
    return <View style={[styles.placeholder, { backgroundColor: placeholderColor }, style]} />;
  }

  return (
    <View style={[styles.container, style]}>
      {/* 1. Placeholder Background */}
      {!isLoaded && <View style={[styles.placeholder, { backgroundColor: placeholderColor }, StyleSheet.absoluteFill]} />}

      {/* 2. Progressive Thumbnail / BlurHash Placeholder */}
      {thumbnailUri && !isLoaded && (
        <Image
          source={{ uri: thumbnailUri }}
          style={[StyleSheet.absoluteFill, style]}
          blurRadius={6}
        />
      )}

      {/* 3. High-res Target Image with Smooth Fade-in */}
      <Animated.Image
        source={{ uri: imageSourceUri }}
        style={[style, { opacity }]}
        onLoad={handleLoad}
        onError={handleError}
        {...restProps}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  placeholder: {
    width: '100%',
    height: '100%',
  },
});
