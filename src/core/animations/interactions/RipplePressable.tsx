import React, { memo, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export interface RipplePressableProps {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
  rippleColor?: string;
}

export const RipplePressable: React.FC<RipplePressableProps> = memo(({
  children,
  onPress,
  onLongPress,
  style,
  rippleColor = 'rgba(10, 102, 194, 0.2)',
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    rippleScale.setValue(0);
    rippleOpacity.setValue(1);

    Animated.parallel([
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }),
      Animated.timing(rippleScale, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(rippleOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Animated.View style={[styles.container, { transform: [{ scale }] }, style]}>
        <Animated.View
          style={[
            styles.ripple,
            {
              backgroundColor: rippleColor,
              opacity: rippleOpacity,
              transform: [{ scale: rippleScale }],
            },
          ]}
        />
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  ripple: {
    ...StyleSheet.absoluteFill,
    borderRadius: 9999,
  },
});
