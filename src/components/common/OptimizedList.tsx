import React, { memo, useCallback } from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo } from 'react-native';

export interface OptimizedListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[];
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement;
  keyExtractorField?: keyof T | ((item: T, index: number) => string);
  ItemSeparatorComponent?: React.ComponentType<any>;
}

function OptimizedListComponent<T extends { id?: string | number }>(props: OptimizedListProps<T>) {
  const { data, renderItem, keyExtractorField, ItemSeparatorComponent, ...restProps } = props;

  const keyExtractor = useCallback(
    (item: T, index: number) => {
      if (typeof keyExtractorField === 'function') {
        return keyExtractorField(item, index);
      }
      if (keyExtractorField && item[keyExtractorField]) {
        return String(item[keyExtractorField]);
      }
      return item.id ? String(item.id) : `item_${index}`;
    },
    [keyExtractorField]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={7}
      {...restProps}
    />
  );
}

export const OptimizedList = memo(OptimizedListComponent) as typeof OptimizedListComponent;
