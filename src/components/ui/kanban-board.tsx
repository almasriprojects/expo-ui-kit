import React, { type ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type KanbanItem = {
  /** Unique key for the item */
  key: string;
  /** Content rendered inside the card */
  content: ReactNode;
};

export type KanbanColumn = {
  /** Unique key for the column */
  key: string;
  /** Column header title */
  title: string;
  /** Array of items in the column */
  items: KanbanItem[];
};

export type KanbanBoardProps = {
  /** Array of column definitions with items */
  columns: KanbanColumn[];
  /** Callback fired when an item card is pressed */
  onItemPress?: (columnKey: string, itemKey: string) => void;
  /** Accessibility label for the board */
  accessibilityLabel?: string;
  /** Accessibility hint for the board */
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
              fontSize: FontSize.md.fontSize,
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
