import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BoardColumnProps = {
  /** Column header title */
  title: string;
  /** Number of items displayed in the count badge */
  count: number;
  /** Accent color for the column indicator dot */
  color?: string;
  /** Callback invoked when the add button is pressed */
  onAdd?: () => void;
  /** Column content (typically kanban cards) */
  children: React.ReactNode;
  /** Custom styles for the column container */
  style?: ViewStyle;
};

export function BoardColumn({
  title,
  count,
  color,
  onAdd,
  children,
  style,
}: BoardColumnProps) {
  const t = useTheme();
  const accentColor = color ?? t.primary;

  return (
    <View
      style={[
        {
          backgroundColor: t.surface,
          borderRadius: Radius.xl,
          padding: 12,
          minWidth: 280,
        },
        style,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 10, height: 10, borderRadius: Radius.full, backgroundColor: accentColor }} />
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: t.text }}>{title}</Text>
          <View
            style={{
              minWidth: 22,
              height: 22,
              borderRadius: Radius.full,
              backgroundColor: t.surfaceActive,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={{ fontSize: FontSize.xs.fontSize, fontWeight: '600', color: t.textSecondary }}>{count}</Text>
          </View>
        </View>
        {onAdd && (
          <Pressable
            onPress={onAdd}
            style={{
              width: 26,
              height: 26,
              borderRadius: Radius.md,
              backgroundColor: t.surfaceActive,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: FontSize.lg.fontSize, color: t.textSecondary }}>+</Text>
          </Pressable>
        )}
      </View>
      <View style={{ gap: 8 }}>{children}</View>
    </View>
  );
}
