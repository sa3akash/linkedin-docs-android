import React, { memo } from 'react';
import { ImageProps, ImageStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export interface AnimatedImageProps extends ImageProps {
  style?: StyleProp<ImageStyle>;
}

export const AnimatedImage: React.FC<AnimatedImageProps> = memo(({ style, onLoad, ...restProps }) => {
  const opacity = useSharedValue(0);

  const handleLoad = (e: any) => {
    opacity.value = withTiming(1, { duration: 300 });

    if (onLoad) {
      onLoad(e);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.Image style={[style, animatedStyle]} onLoad={handleLoad} {...restProps} />;
});
