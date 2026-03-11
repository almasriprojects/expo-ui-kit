import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type QuantityStepperProps = ViewProps & {
  /** Current numeric value */
  value: number;
  /** Callback invoked when the value changes */
  onValueChange: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Increment/decrement step size */
  step?: number;
  /** Label text displayed above the stepper */
  label?: string;
  /** Size variant of the stepper controls */
  size?: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: { btn: 28, text: FontSize.sm.fontSize, gap: 12 },
  md: { btn: 36, text: FontSize.md.fontSize, gap: 16 },
  lg: { btn: 44, text: FontSize.xl.fontSize, gap: 20 },
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
        <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', marginBottom: 8, color: theme.text }}>
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
            borderRadius: Radius.full,
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
            borderRadius: Radius.full,
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
