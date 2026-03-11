import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { Flame } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type StreakCounterProps = {
  /** Current streak count */
  count: number;
  /** Label text displayed below the count */
  label?: string;
  /** Array of 7 booleans indicating completed weekdays (Mon–Sun) */
  weekdays?: boolean[];
  /** Custom styles applied to the container */
  style?: ViewStyle;
};

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function StreakCounter({
  count,
  label = 'Day Streak',
  weekdays,
  style,
}: StreakCounterProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <Flame size={36} color={t.orange} />
      <Text style={{ fontSize: FontSize['4xl'].fontSize, fontWeight: '900', color: t.text, marginTop: 4 }}>
        {count}
      </Text>
      <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.textSecondary, marginTop: 2 }}>
        {label}
      </Text>
      {weekdays && (
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
          {weekdays.map((active, i) => (
            <View key={i} style={{ alignItems: 'center', gap: 4 }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: Radius.full,
                  backgroundColor: active ? t.orange : t.surface,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {active ? (
                  <Flame size={14} color={t.orange} />
                ) : (
                  <View style={{ width: 8, height: 8, borderRadius: Radius.full, backgroundColor: t.surfaceActive }} />
                )}
              </View>
              <Text style={{ fontSize: FontSize['2xs'].fontSize, fontWeight: '500', color: t.textTertiary }}>{DAYS[i]}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
