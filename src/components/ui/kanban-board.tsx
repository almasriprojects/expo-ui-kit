import React, { type ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type KanbanItem = {
  key: string;
  content: ReactNode;
};

export type KanbanColumn = {
  key: string;
  title: string;
  items: KanbanItem[];
};

export type KanbanBoardProps = {
  columns: KanbanColumn[];
  onItemPress?: (columnKey: string, itemKey: string) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function KanbanBoard({
  columns,
  onItemPress,
  accessibilityLabel,
  accessibilityHint,
}: KanbanBoardProps) {
  const t = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 16, gap: 16 }}
      accessible
      accessibilityLabel={accessibilityLabel ?? `Kanban board with ${columns.length} columns`}
      accessibilityHint={accessibilityHint}>
      {columns.map((col) => (
        <View
          key={col.key}
          style={{
            width: 280,
            backgroundColor: t.surface,
            borderRadius: Radius.xl,
            padding: 12,
            ...Shadows.sm,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: t.text,
              marginBottom: 12,
            }}>
            {col.title}
          </Text>
          <View style={{ gap: 8 }}>
            {col.items.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => onItemPress?.(col.key, item.key)}
                style={({ pressed }) => ({
                  backgroundColor: t.card,
                  borderRadius: Radius.md,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: t.border,
                  opacity: pressed ? 0.8 : 1,
                })}
                accessibilityRole="button"
                accessibilityLabel={`Item ${item.key}`}
                accessibilityHint={onItemPress ? 'Double tap to open' : undefined}>
                {item.content}
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
