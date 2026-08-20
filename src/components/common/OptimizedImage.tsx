import React, { useState, memo, useCallback } from 'react';
import { Image, ImageProps, ImageStyle, StyleProp, StyleSheet, View } from 'react-native';

export interface OptimizedImageProps extends Omit<ImageProps, 'source'> {
  uri?: string;
  thumbnailUri?: string;
  style?: StyleProp<ImageStyle>;
  placeholderColor?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
  uri,
  thumbnailUri,
  style,
  placeholderColor = '#E1E9EE',
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setIsError(true);
  }, []);

  if (!uri || isError) {
    return <View style={[styles.placeholder, { backgroundColor: placeholderColor }, style]} />;
  }

  return (
    <View style={[styles.container, style]}>
      {/* Skeleton / Placeholder View */}
      {!isLoaded && <View style={[styles.placeholder, { backgroundColor: placeholderColor }, StyleSheet.absoluteFill]} />}

      {/* Optional Thumbnail for progressive loading */}
      {thumbnailUri && !isLoaded && (
        <Image
          source={{ uri: thumbnailUri }}
          style={[StyleSheet.absoluteFill, style]}
          blurRadius={5}
        />
      )}

      {/* Main Image */}
      <Image
        source={{ uri }}
        style={[style, !isLoaded && styles.hidden]}
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
  },
  placeholder: {
    width: '100%',
    height: '100%',
  },
  hidden: {
    opacity: 0,
  },
});
