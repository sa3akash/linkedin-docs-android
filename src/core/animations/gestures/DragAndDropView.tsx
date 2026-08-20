import React, { memo, useRef } from 'react';
import { Animated, PanResponder, StyleProp, ViewStyle } from 'react-native';

export interface DragAndDropViewProps {
  children: React.ReactNode;
  onDragEnd?: (x: number, y: number) => void;
  style?: StyleProp<ViewStyle>;
}

export const DragAndDropView: React.FC<DragAndDropViewProps> = memo(({
  children,
  onDragEnd,
  style,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (onDragEnd) {
          onDragEnd(gestureState.moveX, gestureState.moveY);
        }
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 6,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View style={[pan.getLayout(), style]} {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
});
