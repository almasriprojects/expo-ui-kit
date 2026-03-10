import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type InfoRowProps = {
  label: string;
  value: string | ReactNode;
  icon?: ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  valueColor?: string;
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
        <Text style={{ fontSize: 15, color: t.textSecondary }}>{label}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 }}>
        {typeof value === 'string' ? (
          <Text
            style={{ fontSize: 15, fontWeight: '500', color: valueColor ?? t.text }}
            numberOfLines={1}>
            {value}
          </Text>
        ) : (
          value
        )}
        {(showChevron || onPress) && (
          <Text style={{ fontSize: 14, color: t.textTertiary }}>›</Text>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}
