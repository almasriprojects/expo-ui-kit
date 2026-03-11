import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';

import { Radius, Shadows, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BalanceCardProps = {
  /** Formatted balance amount string */
  balance: string;
  /** Currency code displayed alongside the balance */
  currency?: string;
  /** Descriptive label above the balance */
  label?: string;
  /** Trend indicator showing value change and direction */
  trend?: { value: string; positive: boolean };
  /** Quick action buttons displayed at the bottom */
  actions?: { label: string; icon: ReactNode; onPress: () => void }[];
  /** Custom styles for the card container */
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
      <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '500', color: t.primaryForeground, opacity: 0.7 }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '500', color: t.primaryForeground, opacity: 0.7 }}>
          {currency}
        </Text>
        <Text style={{ fontSize: FontSize['4xl'].fontSize, fontWeight: '800', color: t.primaryForeground }}>
          {balance}
        </Text>
      </View>
      {trend && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }}>
          {trend.positive ? (
            <ArrowUp size={13} color={t.primaryForeground} />
          ) : (
            <ArrowDown size={13} color={t.primaryForeground} />
          )}
          <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.primaryForeground }}>
            {trend.value}
          </Text>
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.primaryForeground, opacity: 0.6 }}>
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
              {a.icon}
              <Text style={{ fontSize: FontSize.xs.fontSize, fontWeight: '600', color: t.primaryForeground }}>
                {a.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
