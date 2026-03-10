import React, { type ReactNode, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type PullToRefreshProps = {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function PullToRefresh({
  onRefresh,
  children,
  accessibilityLabel,
  accessibilityHint,
}: PullToRefreshProps) {
  const t = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={t.primary}
          colors={[t.primary]}
        />
      }
      accessible
      accessibilityLabel={accessibilityLabel ?? 'Pull to refresh content'}
      accessibilityHint={accessibilityHint}>
      {children}
    </ScrollView>
  );
}
