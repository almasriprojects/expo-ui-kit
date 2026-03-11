import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { CheckCircle } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ProgressCardProps = {
  /** Title text for the progress item */
  title: string;
  /** Secondary text displayed below the title */
  subtitle?: string;
  /** Completion percentage (0–100) */
  progress: number;
  /** Icon element displayed in the leading area */
  icon?: ReactNode;
  /** Label for the completed portion (e.g. "3 of 5") */
  completedLabel?: string;
  /** Label for the total (e.g. "5 tasks") */
  totalLabel?: string;
  /** Callback invoked when the card is pressed */
  onPress?: () => void;
  /** Custom styles applied to the card container */
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
            {isComplete ? <CheckCircle size={20} color={t.success} /> : icon}
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{title}</Text>
          {subtitle && (
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 2 }}>{subtitle}</Text>
          )}
        </View>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: isComplete ? t.success : t.primary }}>
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
            <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textSecondary }}>{completedLabel}</Text>
            <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textSecondary }}>{totalLabel}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
