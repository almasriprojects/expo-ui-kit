import React from 'react';
import { Pressable, Text, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type WishlistButtonProps = {
  active: boolean;
  onToggle: (active: boolean) => void;
  variant?: 'icon' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  count?: number;
  style?: ViewStyle;
};

const iconSizes = { sm: 16, md: 20, lg: 26 };
const btnSizes = { sm: 32, md: 40, lg: 52 };

export function WishlistButton({
  active,
  onToggle,
  variant = 'icon',
  size = 'md',
  count,
  style,
}: WishlistButtonProps) {
  const t = useTheme();
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(withSpring(1.3), withSpring(1));
    onToggle(!active);
  };

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (variant === 'pill') {
    return (
      <Pressable
        onPress={handlePress}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: Radius.full,
            backgroundColor: active ? t.errorSoft : t.surface,
            borderWidth: 1,
            borderColor: active ? t.error : t.border,
          },
          style,
        ]}>
        <Text style={{ fontSize: iconSizes[size], color: active ? t.error : t.textSecondary }}>
          {active ? '❤️' : '🤍'}
        </Text>
        {count != null && (
          <Text style={{ fontSize: 13, fontWeight: '600', color: active ? t.error : t.textSecondary }}>
            {count}
          </Text>
        )}
      </Pressable>
    );
  }

  return (
    <Animated.View style={animStyle}>
      <Pressable
        onPress={handlePress}
        style={[
          {
            width: btnSizes[size],
            height: btnSizes[size],
            borderRadius: Radius.full,
            backgroundColor: active ? t.errorSoft : t.surface,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: active ? 'transparent' : t.border,
            ...Shadows.sm,
          },
          style,
        ]}>
        <Text style={{ fontSize: iconSizes[size] }}>
          {active ? '❤️' : '🤍'}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
