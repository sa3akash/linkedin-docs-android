import React, { memo, useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  PanResponder,
} from 'react-native';

export interface BottomSheetContainerProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[]; // e.g. [200, 400, 600]
  initialSnapIndex?: number;
}

export const BottomSheetContainer: React.FC<BottomSheetContainerProps> = memo(({
  visible,
  onClose,
  children,
  snapPoints = [300, 500],
  initialSnapIndex = 0,
}) => {
  const currentHeight = snapPoints[initialSnapIndex] || snapPoints[0];
  const translateY = useRef(new Animated.Value(currentHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose();
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
    } else {
      Animated.timing(translateY, { toValue: currentHeight, duration: 250, useNativeDriver: true }).start();
    }
  }, [visible, translateY, currentHeight]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="none">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.sheet,
                  { height: currentHeight, transform: [{ translateY }] },
                ]}
                {...panResponder.panHandlers}
              >
                <View style={styles.dragHandle} />
                <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                  {children}
                </ScrollView>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D0D0D0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
});
