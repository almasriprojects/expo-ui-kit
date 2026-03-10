import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export type DescriptionListProps = {
  items: { term: string; description: string }[];
  direction?: 'horizontal' | 'vertical';
};

export function DescriptionList({
  items,
  direction = 'vertical',
}: DescriptionListProps) {
  const t = useTheme();

  const isHorizontal = direction === 'horizontal';

  return (
    <View
      style={{
        gap: isHorizontal ? 16 : 12,
      }}
      accessibilityLabel="Description list">
      {items.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: isHorizontal ? 'row' : 'column',
            gap: isHorizontal ? 8 : 4,
            alignItems: isHorizontal ? 'baseline' : 'flex-start',
          }}
          accessibilityLabel={`${item.term}: ${item.description}`}>
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: t.text,
              flexShrink: isHorizontal ? 0 : undefined,
            }}>
            {item.term}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 14,
              color: t.textSecondary,
              flex: isHorizontal ? 1 : undefined,
            }}>
            {item.description}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}
