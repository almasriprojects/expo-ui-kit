import React from 'react';
import { View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MasonryGridItem = {
  key: string;
  height: number;
  content: React.ReactNode;
};

export type MasonryGridProps = {
  data: MasonryGridItem[];
  columns?: number;
  gap?: number;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function MasonryGrid({
  data,
  columns = 2,
  gap = 12,
  accessibilityLabel,
  accessibilityHint,
}: MasonryGridProps) {
  const t = useTheme();

  const { columnContents } = React.useMemo(() => {
    const heights = new Array(columns).fill(0);
    const contents: React.ReactNode[][] = new Array(columns)
      .fill(null)
      .map(() => []);

    data.forEach((item) => {
      const minIdx = heights.indexOf(Math.min(...heights));
      contents[minIdx].push(
        <View
          key={item.key}
          style={{
            marginBottom: gap,
            borderRadius: Radius.md,
            overflow: 'hidden',
            backgroundColor: t.surface,
          }}
        >
          {item.content}
        </View>
      );
      heights[minIdx] += item.height + gap;
    });

    return { columnContents: contents };
  }, [data, columns, gap, t.surface]);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap,
      }}
      accessible
      accessibilityLabel={accessibilityLabel ?? 'Masonry grid'}
      accessibilityHint={accessibilityHint}
    >
      {columnContents.map((contents, idx) => (
        <View
          key={idx}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {contents}
        </View>
      ))}
    </View>
  );
}
