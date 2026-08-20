import React, { memo } from 'react';
import { StyleProp, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

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
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleRelease = () => {
    if (onDragEnd) {
      onDragEnd(translateX.value, translateY.value);
    }
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return (
    <TouchableWithoutFeedback onPressOut={handleRelease}>
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
});
