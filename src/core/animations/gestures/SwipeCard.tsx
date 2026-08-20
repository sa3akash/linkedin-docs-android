import React, { memo } from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export interface SwipeCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SwipeCard: React.FC<SwipeCardProps> = memo(({
  children,
  onSwipeLeft,
  onSwipeRight,
  style,
}) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleSwipeLeft = () => {
    translateX.value = withSpring(-400);
    if (onSwipeLeft) onSwipeLeft();
  };

  const handleSwipeRight = () => {
    translateX.value = withSpring(400);
    if (onSwipeRight) onSwipeRight();
  };

  return (
    <TouchableWithoutFeedback onLongPress={handleSwipeLeft} onPress={handleSwipeRight}>
      <Animated.View style={[styles.card, animatedStyle, style]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
