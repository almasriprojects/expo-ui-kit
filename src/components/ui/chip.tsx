import React from 'react';
import { Pressable, type ViewProps } from 'react-native';
import { X } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ChipProps = ViewProps & {
  /** Text displayed inside the chip */
  label: string;
  /** Whether the chip is in a selected state */
  selected?: boolean;
  /** Callback invoked when the chip is pressed */
  onPress?: () => void;
  /** Callback invoked when the delete icon is pressed */
  onDelete?: () => void;
  /** Whether the chip is disabled */
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
      accessibilityRole={onPress ? 'button' : undefined}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing[1.5],
          paddingHorizontal: Spacing[3],
          paddingVertical: Spacing[1.5],
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
          fontSize: FontSize.md.fontSize,
          fontWeight: selected ? '600' : '500',
          color: selected ? t.primaryForeground : t.text,
        }}>
        {label}
      </ThemedText>
      {onDelete && (
        <Pressable onPress={onDelete} hitSlop={8} style={{ marginLeft: Spacing[0.5], opacity: selected ? 0.8 : 1 }}>
          <X size={12} color={selected ? t.primaryForeground : t.textSecondary} />
        </Pressable>
      )}
    </Pressable>
  );
}
