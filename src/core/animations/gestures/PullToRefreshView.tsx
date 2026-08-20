import React, { memo, useRef, useState } from 'react';
import { Animated, PanResponder, StyleProp, ViewStyle, StyleSheet, ActivityIndicator, View } from 'react-native';

export interface PullToRefreshViewProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  style?: StyleProp<ViewStyle>;
}

export const PullToRefreshView: React.FC<PullToRefreshViewProps> = memo(({
  children,
  onRefresh,
  threshold = 80,
  style,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 15 && !refreshing,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          // Resistance formula
          translateY.setValue(Math.min(gestureState.dy * 0.5, threshold * 1.5));
        }
      },
      onPanResponderRelease: async (_, gestureState) => {
        if (gestureState.dy * 0.5 >= threshold && !refreshing) {
          setRefreshing(true);
          Animated.spring(translateY, { toValue: threshold, useNativeDriver: true }).start();

          try {
            await onRefresh();
          } finally {
            setRefreshing(false);
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
          }
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <View style={[styles.container, style]} {...panResponder.panHandlers}>
      <Animated.View style={[styles.indicator, { transform: [{ translateY }] }]}>
        <ActivityIndicator size="small" color="#0A66C2" />
      </Animated.View>
      <Animated.View style={[{ transform: [{ translateY }] }]}>{children}</Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
});
