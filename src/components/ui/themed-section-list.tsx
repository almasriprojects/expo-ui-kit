import React, { type ReactElement } from 'react';
import { SectionList, type ListRenderItemInfo, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type ThemedSection<T> = {
  title: string;
  data: T[];
};

export type ThemedSectionListProps<T> = {
  sections: ThemedSection<T>[];
  renderItem: (info: ListRenderItemInfo<T>) => ReactElement | null;
  renderSectionHeader?: (info: { section: ThemedSection<T> }) => ReactElement | null;
  ListEmptyComponent?: ReactElement | null;
  keyExtractor?: (item: T, index: number) => string;
  accessibilityLabel?: string;
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
          fontSize: 13,
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
