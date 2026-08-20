import React, { memo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../core/theme/tokens';

export const InfiniteLoader: React.FC = memo(() => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="small" color={colors.primary} />
  </View>
));

const styles = StyleSheet.create({
  loaderContainer: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
});
