import { Image } from 'expo-image';
import React from 'react';
import { View, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { FontSize } from '@/constants/theme';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = {
  /** URL of the avatar image */
  source?: string;
  /** Initials displayed when no image is provided */
  initials?: string;
  /** Size preset for the avatar */
  size?: AvatarSize;
  /** Custom styles for the avatar container */
  style?: ViewStyle;
};

const sizeMap: Record<AvatarSize, { pixels: number; fontSize: number }> = {
  xs: { pixels: 24, fontSize: FontSize['2xs'].fontSize },
  sm: { pixels: 32, fontSize: FontSize.sm.fontSize },
  md: { pixels: 40, fontSize: FontSize.md.fontSize },
  lg: { pixels: 56, fontSize: FontSize.xl.fontSize },
  xl: { pixels: 80, fontSize: FontSize['2xl'].fontSize },
};

export function Avatar({ source, initials, size = 'md', style }: AvatarProps) {
  const t = useTheme();
  const s = sizeMap[size];

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        style={{ width: s.pixels, height: s.pixels, borderRadius: s.pixels / 2 }}
        contentFit="cover"
        accessibilityRole="image"
        accessibilityLabel={initials ?? 'Avatar'}
      />
    );
  }

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={initials ?? 'Avatar'}
      style={[{
        width: s.pixels,
        height: s.pixels,
        borderRadius: s.pixels / 2,
        backgroundColor: t.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }, style]}>
      <ThemedText style={{ fontSize: s.fontSize, fontWeight: '700', color: t.primaryForeground }}>
        {initials ?? '?'}
      </ThemedText>
    </View>
  );
}
