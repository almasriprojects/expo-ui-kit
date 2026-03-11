import React, { type ReactElement } from 'react';
import {
  SectionList,
  type ListRenderItemInfo,
  Text,
  View,
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { FontSize } from '@/constants/theme';

export type StickyHeaderSection<T> = {
  /** Title displayed in the sticky header */
  title: string;
  /** Array of items in this section */
  data: T[];
};

export type StickyHeaderListProps<T> = {
  /** Array of sections with sticky headers */
  sections: StickyHeaderSection<T>[];
  /** Render function for each list item */
  renderItem: (info: ListRenderItemInfo<T>) => ReactElement | null;
  /** Function to extract a unique key for each item */
  keyExtractor?: (item: T, index: number) => string;
  /** Accessibility label for the list */
  accessibilityLabel?: string;
  /** Accessibility hint for the list */
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
              fontSize: FontSize.md.fontSize,
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
