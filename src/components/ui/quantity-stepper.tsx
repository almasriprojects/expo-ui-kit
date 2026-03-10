import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type QuantityStepperProps = ViewProps & {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: { btn: 28, text: 13, gap: 12 },
  md: { btn: 36, text: 16, gap: 16 },
  lg: { btn: 44, text: 20, gap: 20 },
};

export function QuantityStepper({
  value,
  onValueChange,
  min = 0,
  max = 999,
  step = 1,
  label,
  size = 'md',
  ...props
}: QuantityStepperProps) {
  const theme = useTheme();
  const s = sizes[size];
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <View {...props}>
      {label && (
        <ThemedText style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: theme.text }}>
          {label}
        </ThemedText>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable
          onPress={() => canDecrease && onValueChange(value - step)}
          disabled={!canDecrease}
          style={{
            width: s.btn,
            height: s.btn,
            borderRadius: s.btn / 2,
            backgroundColor: canDecrease ? theme.surface : theme.cardPressed,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: canDecrease ? 1 : 0.4,
          }}>
          <ThemedText style={{ fontSize: s.text, fontWeight: '600', color: theme.text }}>
            −
          </ThemedText>
        </Pressable>
        <View style={{ minWidth: s.gap * 2, alignItems: 'center' }}>
          <ThemedText style={{ fontSize: s.text, fontWeight: '700', color: theme.text }}>
            {value}
          </ThemedText>
        </View>
        <Pressable
          onPress={() => canIncrease && onValueChange(value + step)}
          disabled={!canIncrease}
          style={{
            width: s.btn,
            height: s.btn,
            borderRadius: s.btn / 2,
            backgroundColor: canIncrease ? theme.primaryPressed : theme.cardPressed,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: canIncrease ? 1 : 0.4,
          }}>
          <ThemedText style={{ fontSize: s.text, fontWeight: '600', color: theme.primaryForeground }}>
            +
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
