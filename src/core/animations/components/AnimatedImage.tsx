import React, { memo, useRef } from 'react';
import { Animated, ImageProps, ImageStyle, StyleProp } from 'react-native';

export interface AnimatedImageProps extends ImageProps {
  style?: StyleProp<ImageStyle>;
}

export const AnimatedImage: React.FC<AnimatedImageProps> = memo(({ style, onLoad, ...restProps }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const handleLoad = (e: any) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (onLoad) {
      onLoad(e);
    }
  };

  return <Animated.Image style={[style, { opacity }]} onLoad={handleLoad} {...restProps} />;
});
