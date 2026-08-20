import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export interface SwipeActionProps {
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  leftAction?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const SwipeAction: React.FC<SwipeActionProps> = memo(({
  children,
  rightAction,
  leftAction,
  style,
}) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const resetPosition = () => {
    translateX.value = withSpring(0);
  };

  return (
    <View style={styles.container}>
      {leftAction && <View style={[styles.action, styles.left]}>{leftAction}</View>}
      {rightAction && <View style={[styles.action, styles.right]}>{rightAction}</View>}
      <TouchableWithoutFeedback onPress={resetPosition}>
        <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  action: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    width: 80,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
    alignItems: 'flex-end',
  },
});
