import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type AvatarProps = {
  source?: string;
  initials?: string;
  size?: AvatarSize;
};

const sizeMap: Record<AvatarSize, { pixels: number; fontSize: number }> = {
  xs: { pixels: 24, fontSize: 9 },
  sm: { pixels: 32, fontSize: 12 },
  md: { pixels: 40, fontSize: 14 },
  lg: { pixels: 56, fontSize: 18 },
  xl: { pixels: 80, fontSize: 24 },
};

export function Avatar({ source, initials, size = 'md' }: AvatarProps) {
  const t = useTheme();
  const s = sizeMap[size];

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        style={{ width: s.pixels, height: s.pixels, borderRadius: s.pixels / 2 }}
        contentFit="cover"
      />
    );
  }

  return (
    <View
      style={{
        width: s.pixels,
        height: s.pixels,
        borderRadius: s.pixels / 2,
        backgroundColor: t.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ThemedText style={{ fontSize: s.fontSize, fontWeight: '700', color: t.primaryForeground }}>
        {initials ?? '?'}
      </ThemedText>
    </View>
  );
}
