import React, { type ReactNode } from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type LabelProps = {
  /** Label text content */
  text: string;
  /** Whether to show a required indicator */
  required?: boolean;
  /** Hint text displayed below the label */
  hint?: string;
  /** Custom styles applied to the container */
  style?: ViewStyle;
  /** Content rendered below the label (e.g. an input) */
  children?: ReactNode;
};

export function Label({ text, required, hint, style, children }: LabelProps) {
  const t = useTheme();
  return (
    <View style={[{ gap: 4 }, style]}>
      <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '500', color: t.text }}>
        {text}
        {required && <Text style={{ color: t.error }}> *</Text>}
      </Text>
      {hint && (
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{hint}</Text>
      )}
      {children}
    </View>
  );
}
