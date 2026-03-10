import React, { type ReactNode, useState } from 'react';
import { Pressable, Text, View, type PressableProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type ListItemProps = PressableProps & {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  showChevron?: boolean;
};

export function ListItem({
  title,
  subtitle,
  left,
  right,
  showChevron = false,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  ...props
}: ListItemProps) {
  const t = useTheme();
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={(e) => {
        setPressed(true);
        onPressInProp?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        onPressOutProp?.(e);
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 4,
        opacity: pressed ? 0.7 : 1,
      }}
      {...props}>
      {left && <View>{left}</View>}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, color: t.text }}>{title}</Text>
        {subtitle && (
          <Text style={{ fontSize: 14, marginTop: 2, color: t.textSecondary }}>
            {subtitle}
          </Text>
        )}
      </View>
      {right && <View>{right}</View>}
      {showChevron && !right && (
        <Text style={{ fontSize: 18, color: t.textSecondary }}>›</Text>
      )}
    </Pressable>
  );
}
