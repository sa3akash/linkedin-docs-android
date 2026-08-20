import React, { memo, useRef, useCallback } from 'react';
import { Animated, TouchableWithoutFeedback, View, StyleSheet, Text } from 'react-native';

export interface LikeButtonProps {
  isLiked: boolean;
  onToggleLike: () => void;
  likeCount?: number;
}

export const LikeButton: React.FC<LikeButtonProps> = memo(({ isLiked, onToggleLike, likeCount }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const burstScale = useRef(new Animated.Value(0)).current;
  const burstOpacity = useRef(new Animated.Value(1)).current;

  const triggerAnimation = useCallback(() => {
    // Heart Burst + Scale Animation
    burstScale.setValue(0.5);
    burstOpacity.setValue(1);

    Animated.parallel([
      Animated.sequence([
        Animated.spring(scale, { toValue: 1.3, friction: 3, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]),
      Animated.timing(burstScale, { toValue: 2, duration: 400, useNativeDriver: true }),
      Animated.timing(burstOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();

    onToggleLike();
  }, [scale, burstScale, burstOpacity, onToggleLike]);

  return (
    <TouchableWithoutFeedback onPress={triggerAnimation}>
      <View style={styles.container}>
        {/* Heart Burst Particle Effect */}
        <Animated.View
          style={[
            styles.burst,
            {
              transform: [{ scale: burstScale }],
              opacity: burstOpacity,
            },
          ]}
        />
        <Animated.View style={{ transform: [{ scale }] }}>
          <Text style={[styles.icon, isLiked && styles.likedIcon]}>{isLiked ? '❤️' : '🤍'}</Text>
        </Animated.View>
        {likeCount !== undefined && <Text style={styles.count}>{likeCount}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    position: 'relative',
  },
  icon: {
    fontSize: 24,
  },
  likedIcon: {
    transform: [{ scale: 1.1 }],
  },
  count: {
    marginLeft: 6,
    fontSize: 14,
    color: '#00000099',
    fontWeight: '600',
  },
  burst: {
    position: 'absolute',
    left: 8,
    top: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(217, 37, 37, 0.3)',
  },
});
