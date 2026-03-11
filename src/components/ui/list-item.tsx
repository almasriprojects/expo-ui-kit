import React, { type ReactNode, useState } from 'react';
import { Pressable, Text, View, type PressableProps } from 'react-native';

import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ListItemProps = PressableProps & {
  /** Primary text displayed in the list item */
  title: string;
  /** Secondary text displayed below the title */
  subtitle?: string;
  /** Content rendered on the left side of the item */
  left?: ReactNode;
  /** Content rendered on the right side of the item */
  right?: ReactNode;
  /** Whether to show a chevron indicator on the right */
  showChevron?: boolean;
};

function ListItemBase({
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
      accessibilityRole={props.onPress ? 'button' : undefined}
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
        gap: Spacing[3],
        paddingVertical: Spacing[3],
        paddingHorizontal: Spacing[1],
        opacity: pressed ? 0.7 : 1,
      }}
      {...props}>
      {left && <View>{left}</View>}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: FontSize.lg.fontSize, color: t.text }}>{title}</Text>
        {subtitle && (
          <Text style={{ fontSize: FontSize.md.fontSize, marginTop: Spacing[0.5], color: t.textSecondary }}>
            {subtitle}
          </Text>
        )}
      </View>
      {right && <View>{right}</View>}
      {showChevron && !right && (
        <Text style={{ fontSize: FontSize.xl.fontSize, color: t.textSecondary }}>›</Text>
      )}
    </Pressable>
  );
}

export const ListItem = React.memo(ListItemBase);
