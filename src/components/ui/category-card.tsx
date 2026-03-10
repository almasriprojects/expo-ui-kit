import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CategoryCardProps = Omit<PressableProps, 'style'> & {
  style?: ViewStyle;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  count?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
};

const cardSizes = {
  sm: { height: 90, iconSize: 28, titleSize: 14, subSize: 12 },
  md: { height: 130, iconSize: 36, titleSize: 16, subSize: 13 },
  lg: { height: 170, iconSize: 44, titleSize: 18, subSize: 14 },
};

export function CategoryCard({
  title,
  subtitle,
  icon,
  count,
  color,
  size = 'md',
  style,
  ...props
}: CategoryCardProps) {
  const t = useTheme();
  const s = cardSizes[size];
  const bgColor = color ?? t.primary;

  return (
    <Pressable
      style={[
        {
          height: s.height,
          borderRadius: Radius.xl,
          overflow: 'hidden',
          backgroundColor: bgColor,
          padding: 14,
          justifyContent: 'space-between',
          ...Shadows.sm,
        },
        style,
      ]}
      {...props}>
      {typeof icon === 'string' ? (
        <Text style={{ fontSize: s.iconSize }}>{icon}</Text>
      ) : (
        <View>{icon}</View>
      )}
      <View>
        <Text
          style={{
            fontSize: s.titleSize,
            fontWeight: '700',
            color: t.textOnColor,
          }}
          numberOfLines={1}>
          {title}
        </Text>
        {(subtitle || count != null) && (
          <Text
            style={{
              fontSize: s.subSize,
              color: t.textOnColorTertiary,
              marginTop: 2,
              fontWeight: '500',
            }}>
            {subtitle ?? `${count} items`}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
