import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';

type AvatarGroupProps = {
  avatars: { source?: string; initials?: string }[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
};

const avatarSizes = { sm: 28, md: 36, lg: 48 };
const fontSizes = { sm: 10, md: 12, lg: 14 };

export function AvatarGroup({ avatars, max = 4, size = 'md', style }: AvatarGroupProps) {
  const t = useTheme();
  const dim = avatarSizes[size];
  const overlap = dim * 0.3;
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      {visible.map((avatar, i) => (
        <View
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : -overlap,
            zIndex: visible.length - i,
            borderWidth: 2,
            borderColor: t.card,
            borderRadius: Radius.full,
          }}>
          <Avatar source={avatar.source} initials={avatar.initials} size={size} />
        </View>
      ))}
      {remaining > 0 && (
        <View
          style={{
            marginLeft: -overlap,
            width: dim,
            height: dim,
            borderRadius: Radius.full,
            backgroundColor: t.surface,
            borderWidth: 2,
            borderColor: t.card,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 0,
          }}>
          <Text style={{ fontSize: fontSizes[size], fontWeight: '700', color: t.textSecondary }}>
            +{remaining}
          </Text>
        </View>
      )}
    </View>
  );
}
