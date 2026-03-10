import React from 'react';
import { Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BackButtonProps = {
  onPress: () => void;
  label?: string;
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
      <ThemedText style={{ fontSize: 20, color: btnColor }}>←</ThemedText>
      {label && (
        <ThemedText style={{ fontSize: 16, fontWeight: '500', color: btnColor }}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );
}
