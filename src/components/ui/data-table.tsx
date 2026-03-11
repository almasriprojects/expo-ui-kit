import React from 'react';
import { ScrollView, Text, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type Column = {
  /** Unique key matching a field in the data records */
  key: string;
  /** Header text displayed for the column */
  header: string;
  /** Fixed width for the column in pixels */
  width?: number;
  /** Text alignment within the column */
  align?: 'left' | 'center' | 'right';
};

export type DataTableProps = ViewProps & {
  /** Column definitions for the table */
  columns: Column[];
  /** Array of row data records */
  data: Record<string, string | number | React.ReactNode>[];
  /** Whether to alternate row background colors */
  striped?: boolean;
};

export function DataTable({
  columns,
  data,
  striped = true,
  ...props
}: DataTableProps) {
  const theme = useTheme();

  const cellStyle = (col: Column) => ({
    flex: col.width ? 0 : 1,
    width: col.width,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center' as const,
    alignItems: col.align === 'right'
      ? ('flex-end' as const)
      : col.align === 'center'
        ? ('center' as const)
        : ('flex-start' as const),
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          borderRadius: Radius.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: theme.cardPressed,
        }}
        {...props}>
        {/* Header */}
        <View style={{ flexDirection: 'row', backgroundColor: theme.surface }}>
          {columns.map((col) => (
            <View key={col.key} style={cellStyle(col)}>
              <ThemedText style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: theme.textSecondary }}>
                {col.header}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Rows */}
        {data.map((row, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              backgroundColor:
                striped && i % 2 === 1 ? theme.card : 'transparent',
              borderTopWidth: 1,
              borderTopColor: theme.cardPressed,
            }}>
            {columns.map((col) => (
              <View key={col.key} style={cellStyle(col)}>
                {typeof row[col.key] === 'object' ? (
                  row[col.key] as React.ReactNode
                ) : (
                  <Text style={{ fontSize: FontSize.sm.fontSize, color: theme.text }}>
                    {String(row[col.key] ?? '')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
