import React from 'react';
import { FlatList, FlatListProps, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface InfiniteListProps<T> extends Omit<FlatListProps<T>, 'onEndReached'> {
  data: T[];
  onLoadMore: () => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  isEmpty?: boolean;
  emptyText?: string;
}

export function InfiniteList<T>({
  data,
  onLoadMore,
  isLoadingMore = false,
  hasMore = true,
  isEmpty = false,
  emptyText = 'No items available',
  renderItem,
  keyExtractor,
  ...props
}: InfiniteListProps<T>) {
  const { colors, spacing, typography } = useTheme();

  const handleEndReached = () => {
    if (hasMore && !isLoadingMore) {
      onLoadMore();
    }
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={[styles.footer, { paddingVertical: spacing.md }]}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={[styles.emptyContainer, { padding: spacing.xxl }]}>
      <Text style={[typography.body1, styles.emptyText, { color: colors.textMuted }]}>
        {emptyText}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={isEmpty || data.length === 0 ? renderEmpty : undefined}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});
