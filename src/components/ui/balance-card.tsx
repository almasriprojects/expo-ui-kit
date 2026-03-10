import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BalanceCardProps = {
  balance: string;
  currency?: string;
  label?: string;
  trend?: { value: string; positive: boolean };
  actions?: { label: string; icon: string; onPress: () => void }[];
  style?: ViewStyle;
};

export function BalanceCard({
  balance,
  currency = 'USD',
  label = 'Total Balance',
  trend,
  actions,
  style,
}: BalanceCardProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: t.primary,
          borderRadius: Radius['2xl'],
          padding: 24,
          ...Shadows.lg,
        },
        style,
      ]}>
      <Text style={{ fontSize: 13, fontWeight: '500', color: t.primaryForeground, opacity: 0.7 }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: t.primaryForeground, opacity: 0.7 }}>
          {currency}
        </Text>
        <Text style={{ fontSize: 36, fontWeight: '800', color: t.primaryForeground }}>
          {balance}
        </Text>
      </View>
      {trend && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }}>
          <Text style={{ fontSize: 13, color: t.primaryForeground }}>
            {trend.positive ? '▲' : '▼'}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: '600', color: t.primaryForeground }}>
            {trend.value}
          </Text>
          <Text style={{ fontSize: 12, color: t.primaryForeground, opacity: 0.6 }}>
            this month
          </Text>
        </View>
      )}
      {actions && actions.length > 0 && (
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
          {actions.map((a, i) => (
            <Pressable
              key={i}
              onPress={a.onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                gap: 6,
                paddingVertical: 10,
                borderRadius: Radius.xl,
                backgroundColor: t.surfaceOnColorSubtle,
              }}>
              <Text style={{ fontSize: 18 }}>{a.icon}</Text>
              <Text style={{ fontSize: 11, fontWeight: '600', color: t.primaryForeground }}>
                {a.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
