import React, { memo, useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

export interface WaveViewProps {
  barCount?: number;
  color?: string;
  size?: number;
}

export const WaveView: React.FC<WaveViewProps> = memo(({ barCount = 4, color = '#0A66C2', size = 24 }) => {
  const animations = useRef(Array.from({ length: barCount }, () => new Animated.Value(0.3))).current;

  useEffect(() => {
    const sequence = animations.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 150),
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      )
    );

    sequence.forEach((a) => a.start());

    return () => sequence.forEach((a) => a.stop());
  }, [animations]);

  return (
    <View style={styles.container}>
      {animations.map((anim, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              height: size,
              backgroundColor: color,
              transform: [{ scaleY: anim }],
            },
          ]}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  bar: {
    width: 4,
    borderRadius: 2,
  },
});
