import React, { type ReactElement } from 'react';
import { SectionList, type ListRenderItemInfo, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { FontSize } from '@/constants/theme';

export type ThemedSection<T> = {
  /** Title displayed as the section header */
  title: string;
  /** Array of items in this section */
  data: T[];
};

export type ThemedSectionListProps<T> = {
  /** Array of sections to display */
  sections: ThemedSection<T>[];
  /** Render function for each list item */
  renderItem: (info: ListRenderItemInfo<T>) => ReactElement | null;
  /** Custom render function for section headers */
  renderSectionHeader?: (info: { section: ThemedSection<T> }) => ReactElement | null;
  /** Component displayed when the list is empty */
  ListEmptyComponent?: ReactElement | null;
  /** Function to extract a unique key for each item */
  keyExtractor?: (item: T, index: number) => string;
  /** Accessibility label for the list */
  accessibilityLabel?: string;
  /** Accessibility hint for the list */
  accessibilityHint?: string;
};

export function ThemedSectionList<T>({
  sections,
  renderItem,
  renderSectionHeader,
  ListEmptyComponent,
  keyExtractor,
  accessibilityLabel,
  accessibilityHint,
}: ThemedSectionListProps<T>) {
  const t = useTheme();

  const defaultSectionHeader = ({ section }: { section: ThemedSection<T> }) => (
    <View
      style={{
        backgroundColor: t.surface,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: t.border,
      }}>
      <Text
        style={{
          fontSize: FontSize.sm.fontSize,
          fontWeight: '700',
          color: t.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
        {section.title}
      </Text>
    </View>
  );

  const sectionHeader = renderSectionHeader ?? defaultSectionHeader;

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={sectionHeader}
      stickySectionHeadersEnabled
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={keyExtractor ?? ((_, idx) => String(idx))}
      contentContainerStyle={{ paddingBottom: 24 }}
      accessible
      accessibilityLabel={accessibilityLabel ?? 'Section list'}
      accessibilityHint={accessibilityHint}
    />
  );
}
