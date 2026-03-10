import React, { type ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, type ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type StatCardProps = ViewProps & {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: { value: number; label?: string };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
};

function getVariantColors(variant: StatCardProps['variant'], t: ThemeTokens) {
  switch (variant) {
    case 'primary':
      return { bg: t.primarySoft, accent: t.primaryPressed };
    case 'success':
      return { bg: t.successSoft, accent: t.success };
    case 'warning':
      return { bg: t.warningSoft, accent: t.warning };
    case 'error':
      return { bg: t.errorSoft, accent: t.error };
    default:
      return { bg: 'transparent', accent: t.textSecondary };
  }
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  style,
  ...props
}: StatCardProps) {
  const t = useTheme();
  const colors = getVariantColors(variant, t);
  const trendUp = trend && trend.value >= 0;

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 16,
        },
        style,
      ]}
      {...props}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <ThemedText style={{ fontSize: 13, color: t.textSecondary, fontWeight: '500' }}>
          {title}
        </ThemedText>
        {icon && (
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: Radius.lg,
              backgroundColor: colors.bg || t.cardPressed,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {icon}
          </View>
        )}
      </View>
      <Text style={{ fontSize: 28, fontWeight: '700', marginTop: 8, color: t.text }}>
        {value}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6 }}>
        {trend && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: trendUp ? t.successSoft : t.errorSoft,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: Radius.sm,
            }}>
            <ThemedText
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: trendUp ? t.success : t.error,
              }}>
              {trendUp ? '↑' : '↓'} {Math.abs(trend.value)}%
            </ThemedText>
          </View>
        )}
        {(subtitle || trend?.label) && (
          <ThemedText style={{ fontSize: 12, color: t.textSecondary }}>
            {trend?.label ?? subtitle}
          </ThemedText>
        )}
      </View>
    </View>
  );
}
