import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonLoader } from './SkeletonLoader';
import { useTheme } from '../../hooks/useTheme';

export const ShimmerLoader: React.FC = () => {
  const { spacing } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing.md }]}>
      <View style={styles.header}>
        <SkeletonLoader width={48} height={48} borderRadius={24} />
        <View style={{ marginLeft: spacing.md, flex: 1 }}>
          <SkeletonLoader width="60%" height={16} style={{ marginBottom: spacing.xs }} />
          <SkeletonLoader width="40%" height={12} />
        </View>
      </View>
      <SkeletonLoader width="100%" height={14} style={{ marginTop: spacing.md }} />
      <SkeletonLoader width="90%" height={14} style={{ marginTop: spacing.xs }} />
      <SkeletonLoader width="100%" height={180} style={{ marginTop: spacing.md }} borderRadius={8} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
