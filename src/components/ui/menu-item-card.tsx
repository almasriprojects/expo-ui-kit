import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type MenuItemCardProps = {
  name: string;
  description?: string;
  price: string;
  originalPrice?: string;
  calories?: string;
  popular?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
  onAdd?: () => void;
  style?: ViewStyle;
};

export function MenuItemCard({
  name,
  description,
  price,
  originalPrice,
  calories,
  popular = false,
  vegetarian = false,
  spicy = false,
  onAdd,
  style,
}: MenuItemCardProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          borderWidth: 1,
          borderColor: t.border,
          overflow: 'hidden',
          ...Shadows.sm,
        },
        style,
      ]}>
      <View style={{ flex: 1, padding: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {popular && (
            <View style={{ backgroundColor: t.warning, paddingHorizontal: 6, paddingVertical: 1, borderRadius: Radius.sm }}>
              <Text style={{ fontSize: 9, fontWeight: '700', color: t.textOnColor }}>POPULAR</Text>
            </View>
          )}
          {vegetarian && <Text style={{ fontSize: 12 }}>🌱</Text>}
          {spicy && <Text style={{ fontSize: 12 }}>🌶️</Text>}
        </View>
        <Text style={{ fontSize: 15, fontWeight: '600', color: t.text, marginTop: popular || vegetarian || spicy ? 4 : 0 }}>
          {name}
        </Text>
        {description && (
          <Text numberOfLines={2} style={{ fontSize: 12, color: t.textSecondary, marginTop: 4, lineHeight: 17 }}>
            {description}
          </Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: t.text }}>{price}</Text>
          {originalPrice && (
            <Text style={{ fontSize: 12, color: t.textTertiary, textDecorationLine: 'line-through' }}>
              {originalPrice}
            </Text>
          )}
          {calories && (
            <Text style={{ fontSize: 11, color: t.textTertiary }}>{calories} cal</Text>
          )}
        </View>
      </View>
      <View style={{ width: 100, backgroundColor: t.surfaceActive, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 28, opacity: 0.4 }}>🍕</Text>
        {onAdd && (
          <Pressable
            onPress={onAdd}
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              width: 28,
              height: 28,
              borderRadius: Radius.full,
              backgroundColor: t.primary,
              alignItems: 'center',
              justifyContent: 'center',
              ...Shadows.sm,
            }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: t.primaryForeground }}>+</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
