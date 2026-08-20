import React, { memo } from 'react';
import { View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export interface PullToRefreshViewProps {
  children: React.ReactNode;
  refreshing: boolean;
  onRefresh: () => void;
  style?: StyleProp<ViewStyle>;
}

export const PullToRefreshView: React.FC<PullToRefreshViewProps> = memo(({
  children,
  refreshing,
  style,
}) => {
  const pullDistance = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: refreshing ? 50 : withSpring(pullDistance.value) }],
  }));

  return (
    <View style={styles.container}>
      {refreshing && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#0A66C2" />
        </View>
      )}
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    zIndex: 10,
  },
});
