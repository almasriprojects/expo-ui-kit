import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type InfoRowProps = {
  /** Label text displayed on the left */
  label: string;
  /** Value text or element displayed on the right */
  value: string | ReactNode;
  /** Optional icon element displayed before the label */
  icon?: ReactNode;
  /** Callback fired when the row is pressed */
  onPress?: () => void;
  /** Whether to show a chevron indicator */
  showChevron?: boolean;
  /** Custom color for the value text */
  valueColor?: string;
  /** Custom styles applied to the row container */
  style?: ViewStyle;
};

export function InfoRow({
  label,
  value,
  icon,
  onPress,
  showChevron = false,
  valueColor,
  style,
}: InfoRowProps) {
  const t = useTheme();

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 12,
          gap: 12,
        },
        style,
      ]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
        {icon && <View>{icon}</View>}
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary }}>{label}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 }}>
        {typeof value === 'string' ? (
          <Text
            style={{ fontSize: FontSize.md.fontSize, fontWeight: '500', color: valueColor ?? t.text }}
            numberOfLines={1}>
            {value}
          </Text>
        ) : (
          value
        )}
        {(showChevron || onPress) && (
          <Text style={{ fontSize: FontSize.md.fontSize, color: t.textTertiary }}>›</Text>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}
