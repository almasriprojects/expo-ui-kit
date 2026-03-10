import React, { type ReactNode } from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BudgetItem = {
  label: string;
  spent: number;
  budget: number;
  color: string;
  icon?: ReactNode;
};

type BudgetProgressProps = {
  items: BudgetItem[];
  style?: ViewStyle;
};

export function BudgetProgress({ items, style }: BudgetProgressProps) {
  const t = useTheme();

  return (
    <View style={[{ gap: 14 }, style]}>
      {items.map((item, i) => {
        const pct = Math.min((item.spent / item.budget) * 100, 100);
        const over = item.spent > item.budget;

        return (
          <View key={i}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {item.icon && item.icon}
                <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{item.label}</Text>
              </View>
              <Text style={{ fontSize: 13, color: over ? t.error : t.textSecondary }}>
                ${item.spent.toLocaleString()}{' '}
                <Text style={{ color: t.textTertiary }}>/ ${item.budget.toLocaleString()}</Text>
              </Text>
            </View>
            <View
              style={{
                height: 8,
                borderRadius: Radius.full,
                backgroundColor: t.surface,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  height: '100%',
                  width: `${pct}%`,
                  borderRadius: Radius.full,
                  backgroundColor: over ? t.error : item.color,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
