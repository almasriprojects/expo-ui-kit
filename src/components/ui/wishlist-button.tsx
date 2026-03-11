import React from 'react';
import { Pressable, Text, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type WishlistButtonProps = {
  /** Whether the item is currently in the wishlist */
  active: boolean;
  /** Callback invoked when the wishlist state is toggled */
  onToggle: (active: boolean) => void;
  /** Visual variant of the button */
  variant?: 'icon' | 'pill';
  /** Size variant of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Wishlist count displayed in pill variant */
  count?: number;
  /** Custom styles applied to the button container */
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
        <Heart
          size={iconSizes[size]}
          color={active ? t.error : t.textSecondary}
          fill={active ? t.error : 'none'}
        />
        {count != null && (
          <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: active ? t.error : t.textSecondary }}>
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
        <Heart
          size={iconSizes[size]}
          color={active ? t.error : t.textSecondary}
          fill={active ? t.error : 'none'}
        />
      </Pressable>
    </Animated.View>
  );
}
