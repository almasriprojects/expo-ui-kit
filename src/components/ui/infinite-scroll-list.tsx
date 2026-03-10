import React, { type ReactElement } from 'react';
import {
  ActivityIndicator,
  FlatList,
  type ListRenderItem,
  View,
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { EmptyState } from './empty-state';

export type InfiniteScrollListProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
  emptyMessage?: string;
  ListHeaderComponent?: ReactElement | null;
  keyExtractor?: (item: T, index: number) => string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function InfiniteScrollList<T>({
  data,
  renderItem,
  onLoadMore,
  hasMore,
  loading = false,
  emptyMessage = 'No items yet',
  ListHeaderComponent,
  keyExtractor,
  accessibilityLabel,
  accessibilityHint,
}: InfiniteScrollListProps<T>) {
  const t = useTheme();

  const handleEndReached = () => {
    if (hasMore && !loading) onLoadMore();
  };

  const ListEmptyComponent = data.length === 0 ? (
    <EmptyState title={emptyMessage} />
  ) : null;

  const ListFooterComponent = loading && data.length > 0 ? (
    <View style={{ paddingVertical: 16, alignItems: 'center' }}>
      <ActivityIndicator size="small" color={t.primary} />
    </View>
  ) : null;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor ?? ((item, idx) => String(idx))}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.3}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      accessible
      accessibilityLabel={accessibilityLabel ?? 'Scrollable list'}
      accessibilityHint={accessibilityHint}
    />
  );
}
