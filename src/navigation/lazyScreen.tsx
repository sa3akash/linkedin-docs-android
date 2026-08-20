import React, { Suspense, ComponentType } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const ScreenLoader: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0A66C2" />
  </View>
);

export function lazyScreen<P extends object>(
  factory: () => Promise<{ default: ComponentType<P> }>
): React.FC<P> {
  const LazyComponent = React.lazy(factory);

  return function LazyScreenWrapper(props: P) {
    return (
      <Suspense fallback={<ScreenLoader />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});
