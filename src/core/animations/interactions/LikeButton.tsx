import React, { memo, useState, useCallback } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export interface LikeButtonProps {
  initialLiked?: boolean;
  likeCount?: number;
  onLikeToggle?: (liked: boolean) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = memo(({
  initialLiked = false,
  likeCount = 0,
  onLikeToggle,
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(likeCount);

  const scale = useSharedValue(1);
  const burstScale = useSharedValue(0);
  const burstOpacity = useSharedValue(0);

  const triggerAnimation = useCallback(() => {
    scale.value = withSequence(
      withSpring(1.4, { damping: 4, stiffness: 200 }),
      withSpring(1, { damping: 6, stiffness: 150 })
    );

    burstScale.value = 0.5;
    burstOpacity.value = 1;

    burstScale.value = withTiming(2, { duration: 400 });
    burstOpacity.value = withTiming(0, { duration: 400 });
  }, [scale, burstScale, burstOpacity]);

  const handlePress = useCallback(() => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setCount((prev) => (nextLiked ? prev + 1 : prev - 1));

    if (nextLiked) {
      triggerAnimation();
    }

    if (onLikeToggle) {
      onLikeToggle(nextLiked);
    }
  }, [isLiked, triggerAnimation, onLikeToggle]);

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedBurstStyle = useAnimatedStyle(() => ({
    transform: [{ scale: burstScale.value }],
    opacity: burstOpacity.value,
  }));

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress} style={styles.container}>
      <View style={styles.heartWrapper}>
        <Animated.View style={[styles.burst, animatedBurstStyle]} />
        <Animated.Text style={[styles.heartText, animatedHeartStyle]}>
          {isLiked ? '❤️' : '🤍'}
        </Animated.Text>
      </View>
      <Text style={[styles.countText, isLiked && styles.countTextLiked]}>{count}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  heartWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  burst: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(235, 77, 75, 0.4)',
  },
  heartText: {
    fontSize: 22,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 6,
  },
  countTextLiked: {
    color: '#EB4D4B',
  },
});
