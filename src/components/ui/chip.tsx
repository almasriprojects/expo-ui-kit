import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ChipProps = ViewProps & {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export function Chip({
  label,
  selected = false,
  onPress,
  onDelete,
  disabled = false,
  style,
  ...props
}: ChipProps) {
  const t = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: Radius.full,
          borderWidth: 1,
        },
        selected
          ? { backgroundColor: t.primary, borderColor: t.primary }
          : { backgroundColor: t.surface, borderColor: t.border },
        disabled && { opacity: 0.5 },
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      <ThemedText
        style={{
          fontSize: 14,
          fontWeight: selected ? '600' : '500',
          color: selected ? t.primaryForeground : t.text,
        }}>
        {label}
      </ThemedText>
      {onDelete && (
        <Pressable onPress={onDelete} hitSlop={8} style={{ marginLeft: 2 }}>
          <ThemedText
            style={{
              fontSize: 12,
              fontWeight: '700',
              color: selected ? t.primaryForeground : t.textSecondary,
              opacity: selected ? 0.8 : 1,
            }}>
            ✕
          </ThemedText>
        </Pressable>
      )}
    </Pressable>
  );
}
