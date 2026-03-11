import React, { type ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, type ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type StatCardProps = ViewProps & {
  /** Title label for the statistic */
  title: string;
  /** Primary value displayed prominently */
  value: string | number;
  /** Secondary text displayed below the value */
  subtitle?: string;
  /** Icon element rendered in the top area */
  icon?: ReactNode;
  /** Trend indicator with value and optional label */
  trend?: { value: number; label?: string };
  /** Color variant of the card */
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
        <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, fontWeight: '500' }}>
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
      <Text style={{ fontSize: FontSize['3xl'].fontSize, fontWeight: '700', marginTop: 8, color: t.text }}>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              {trendUp ? (
                <ArrowUp size={12} color={t.success} strokeWidth={3} />
              ) : (
                <ArrowDown size={12} color={t.error} strokeWidth={3} />
              )}
              <ThemedText
                style={{
                  fontSize: FontSize.sm.fontSize,
                  fontWeight: '600',
                  color: trendUp ? t.success : t.error,
                }}>
                {Math.abs(trend.value)}%
              </ThemedText>
            </View>
          </View>
        )}
        {(subtitle || trend?.label) && (
          <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>
            {trend?.label ?? subtitle}
          </ThemedText>
        )}
      </View>
    </View>
  );
}
