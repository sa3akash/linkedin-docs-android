import React, { memo, useRef } from 'react';
import { Animated, PanResponder, StyleProp, ViewStyle, StyleSheet, View } from 'react-native';

export interface SwipeActionProps {
  children: React.ReactNode;
  renderLeftAction?: () => React.ReactNode;
  renderRightAction?: () => React.ReactNode;
  actionWidth?: number;
  style?: StyleProp<ViewStyle>;
}

export const SwipeAction: React.FC<SwipeActionProps> = memo(({
  children,
  renderLeftAction,
  renderRightAction,
  actionWidth = 80,
  style,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        let dx = gestureState.dx;
        if (dx > 0 && !renderLeftAction) dx = 0;
        if (dx < 0 && !renderRightAction) dx = 0;
        translateX.setValue(dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > actionWidth / 2 && renderLeftAction) {
          Animated.spring(translateX, { toValue: actionWidth, useNativeDriver: true }).start();
        } else if (gestureState.dx < -actionWidth / 2 && renderRightAction) {
          Animated.spring(translateX, { toValue: -actionWidth, useNativeDriver: true }).start();
        } else {
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <View style={[styles.container, style]}>
      {renderLeftAction && <View style={[styles.actionContainer, styles.leftAction]}>{renderLeftAction()}</View>}
      {renderRightAction && <View style={[styles.actionContainer, styles.rightAction]}>{renderRightAction()}</View>}
      <Animated.View style={[{ transform: [{ translateX }] }]} {...panResponder.panHandlers}>
        {children}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  actionContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  leftAction: {
    left: 0,
  },
  rightAction: {
    right: 0,
  },
});
