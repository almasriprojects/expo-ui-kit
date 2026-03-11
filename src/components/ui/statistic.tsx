import React from 'react';
import { View } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { FontSize } from '@/constants/theme';

export type StatisticProps = {
  /** Primary numeric or string value */
  value: string | number;
  /** Descriptive label for the statistic */
  label: string;
  /** Trend indicator with value and direction */
  trend?: { value: number; direction: 'up' | 'down' };
  /** Text prefix displayed before the value */
  prefix?: string;
  /** Text suffix displayed after the value */
  suffix?: string;
};

export function Statistic({
  value,
  label,
  trend,
  prefix = '',
  suffix = '',
}: StatisticProps) {
  const t = useTheme();

  const displayValue =
    typeof value === 'number' ? `${prefix}${value}${suffix}` : `${prefix}${value}${suffix}`;

  return (
    <View
      style={{ gap: 4 }}
      accessibilityRole="none"
      accessibilityLabel={`${label}: ${displayValue}${trend ? `, ${trend.direction} ${trend.value}%` : ''}`}>
      <ThemedText
        style={{
          fontSize: FontSize['3xl'].fontSize,
          fontWeight: '700',
          color: t.text,
        }}>
        {displayValue}
      </ThemedText>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <ThemedText style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary }}>
          {label}
        </ThemedText>
        {trend && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            {trend.direction === 'up' ? (
              <ArrowUp size={13} color={t.success} strokeWidth={3} />
            ) : (
              <ArrowDown size={13} color={t.error} strokeWidth={3} />
            )}
            <ThemedText
              style={{
                fontSize: FontSize.sm.fontSize,
                fontWeight: '600',
                color: trend.direction === 'up' ? t.success : t.error,
              }}>
              {trend.value}%
            </ThemedText>
          </View>
        )}
      </View>
    </View>
  );
}
