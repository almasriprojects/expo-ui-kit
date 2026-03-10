import React from 'react';
import { Pressable, Text, type ViewStyle } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FollowButtonProps = {
  following: boolean;
  onToggle: (following: boolean) => void;
  size?: 'sm' | 'md';
  style?: ViewStyle;
};

export function FollowButton({
  following,
  onToggle,
  size = 'md',
  style,
}: FollowButtonProps) {
  const t = useTheme();
  const isSm = size === 'sm';

  return (
    <Pressable
      onPress={() => onToggle(!following)}
      style={[
        {
          paddingHorizontal: isSm ? 14 : 20,
          paddingVertical: isSm ? 6 : 9,
          borderRadius: Radius.full,
          backgroundColor: following ? 'transparent' : t.primary,
          borderWidth: 1.5,
          borderColor: following ? t.border : t.primary,
        },
        style,
      ]}>
      <Text
        style={{
          fontSize: isSm ? 12 : 14,
          fontWeight: '600',
          color: following ? t.text : t.primaryForeground,
        }}>
        {following ? 'Following' : 'Follow'}
      </Text>
    </Pressable>
  );
}
