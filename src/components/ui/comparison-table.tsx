import React from 'react';
import { ScrollView, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export type ComparisonTableProps = {
  columns: { key: string; title: string; highlight?: boolean }[];
  rows: { feature: string; values: Record<string, string | boolean> }[];
};

export function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  const t = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      style={{ flexGrow: 0 }}
      accessibilityLabel="Comparison table">
      <View style={{ minWidth: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: t.border,
          }}>
          <View
            style={{
              width: 120,
              padding: 12,
              justifyContent: 'center',
            }}>
            <ThemedText
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: t.textSecondary,
              }}>
              Feature
            </ThemedText>
          </View>
          {columns.map((col) => (
            <View
              key={col.key}
              style={{
                width: 100,
                padding: 12,
                backgroundColor: col.highlight ? t.primarySoft : t.surface,
                justifyContent: 'center',
              }}>
              <ThemedText
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: t.text,
                }}>
                {col.title}
              </ThemedText>
            </View>
          ))}
        </View>
        {rows.map((row, rowIdx) => (
          <View
            key={rowIdx}
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: t.border,
            }}>
            <View
              style={{
                width: 120,
                padding: 12,
                justifyContent: 'center',
              }}>
              <ThemedText
                style={{
                  fontSize: 14,
                  color: t.text,
                }}
                numberOfLines={2}>
                {row.feature}
              </ThemedText>
            </View>
            {columns.map((col) => {
              const val = row.values[col.key];
              const isBoolean = typeof val === 'boolean';
              const display = isBoolean ? (val ? '✓' : '✗') : String(val);
              const displayColor = isBoolean
                ? val
                  ? t.success
                  : t.textSecondary
                : t.text;

              return (
                <View
                  key={col.key}
                  style={{
                    width: 100,
                    padding: 12,
                    backgroundColor: col.highlight ? t.primarySoft : t.surface,
                    justifyContent: 'center',
                  }}
                  accessibilityLabel={`${row.feature} ${col.title}: ${display}`}>
                  <ThemedText
                    style={{
                      fontSize: 14,
                      color: displayColor,
                      fontWeight: isBoolean ? '600' : '400',
                    }}>
                    {display}
                  </ThemedText>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
