import React from 'react';
import { Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BackButtonProps = {
  /** Callback invoked when the button is pressed */
  onPress: () => void;
  /** Optional text label displayed next to the arrow */
  label?: string;
  /** Custom color for the icon and label */
  color?: string;
};

export function BackButton({ onPress, label, color }: BackButtonProps) {
  const t = useTheme();
  const btnColor = color ?? t.primary;

  const accessibilityLabel = label ? `Back, ${label}` : 'Back';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: Radius.lg,
        opacity: pressed ? 0.8 : 1,
      })}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}>
      <ArrowLeft size={20} color={btnColor} />
      {label && (
        <ThemedText style={{ fontSize: FontSize.lg.fontSize, fontWeight: '500', color: btnColor }}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );
}
