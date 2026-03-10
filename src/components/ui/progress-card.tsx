import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ProgressCardProps = {
  title: string;
  subtitle?: string;
  progress: number;
  icon?: string;
  completedLabel?: string;
  totalLabel?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function ProgressCard({
  title,
  subtitle,
  progress,
  icon,
  completedLabel,
  totalLabel,
  onPress,
  style,
}: ProgressCardProps) {
  const t = useTheme();
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const isComplete = clampedProgress >= 100;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 16,
          borderWidth: 1,
          borderColor: isComplete ? t.success : t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {icon && (
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: Radius.lg,
              backgroundColor: isComplete ? t.successSoft : t.primarySoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 20 }}>{isComplete ? '✅' : icon}</Text>
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: t.text }}>{title}</Text>
          {subtitle && (
            <Text style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>{subtitle}</Text>
          )}
        </View>
        <Text style={{ fontSize: 14, fontWeight: '700', color: isComplete ? t.success : t.primary }}>
          {Math.round(clampedProgress)}%
        </Text>
      </View>

      <View style={{ marginTop: 12 }}>
        <View
          style={{
            height: 6,
            borderRadius: Radius.full,
            backgroundColor: t.surface,
            overflow: 'hidden',
          }}>
          <View
            style={{
              height: '100%',
              width: `${clampedProgress}%`,
              borderRadius: Radius.full,
              backgroundColor: isComplete ? t.success : t.primary,
            }}
          />
        </View>
        {(completedLabel || totalLabel) && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
            <Text style={{ fontSize: 11, color: t.textSecondary }}>{completedLabel}</Text>
            <Text style={{ fontSize: 11, color: t.textSecondary }}>{totalLabel}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
