import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InfiniteList, InfiniteListProps } from './InfiniteList';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { useTheme } from '../../hooks/useTheme';

export interface PaginatedListProps<T> extends Omit<InfiniteListProps<T>, 'onLoadMore'> {
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export function PaginatedList<T>({
  page,
  totalPages,
  onNextPage,
  onPrevPage,
  ...props
}: PaginatedListProps<T>) {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={styles.container}>
      <InfiniteList {...props} onLoadMore={() => {}} hasMore={false} />
      <View style={[styles.controls, { padding: spacing.md, borderTopColor: colors.border }]}>
        <SecondaryButton
          title="Previous"
          onPress={onPrevPage}
          disabled={page <= 1}
          style={styles.btn}
        />
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          Page {page} of {totalPages}
        </Text>
        <PrimaryButton
          title="Next"
          onPress={onNextPage}
          disabled={page >= totalPages}
          style={styles.btn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
  btn: {
    width: 90,
  },
});
