import React, { type ReactElement } from 'react';
import {
  SectionList,
  type ListRenderItemInfo,
  Text,
  View,
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type StickyHeaderSection<T> = {
  title: string;
  data: T[];
};

export type StickyHeaderListProps<T> = {
  sections: StickyHeaderSection<T>[];
  renderItem: (info: ListRenderItemInfo<T>) => ReactElement | null;
  keyExtractor?: (item: T, index: number) => string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function StickyHeaderList<T>({
  sections,
  renderItem,
  keyExtractor = (_, idx) => String(idx),
  accessibilityLabel,
  accessibilityHint,
}: StickyHeaderListProps<T>) {
  const t = useTheme();

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      stickySectionHeadersEnabled
      contentContainerStyle={{ paddingBottom: 24 }}
      renderSectionHeader={({ section }) => (
        <View
          style={{
            backgroundColor: t.surface,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: t.border,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: t.text,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {section.title}
          </Text>
        </View>
      )}
      accessible
      accessibilityLabel={accessibilityLabel ?? 'Section list with sticky headers'}
      accessibilityHint={accessibilityHint}
    />
  );
}
