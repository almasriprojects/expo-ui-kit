import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Flame, Leaf, UtensilsCrossed } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MenuItemCardProps = {
  /** Name of the menu item */
  name: string;
  /** Optional description of the menu item */
  description?: string;
  /** Formatted price string */
  price: string;
  /** Original price shown with strikethrough for discounts */
  originalPrice?: string;
  /** Calorie count label */
  calories?: string;
  /** Whether to display a "POPULAR" badge */
  popular?: boolean;
  /** Whether to display a vegetarian indicator */
  vegetarian?: boolean;
  /** Whether to display a spicy indicator */
  spicy?: boolean;
  /** Callback invoked when the add button is pressed */
  onAdd?: () => void;
  /** Custom styles applied to the card container */
  style?: ViewStyle;
};

function MenuItemCardBase({
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
              <Text style={{ fontSize: FontSize['2xs'].fontSize, fontWeight: '700', color: t.textOnColor }}>POPULAR</Text>
            </View>
          )}
          {vegetarian && <Leaf size={12} color={t.success} />}
          {spicy && <Flame size={12} color={t.error} />}
        </View>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text, marginTop: popular || vegetarian || spicy ? 4 : 0 }}>
          {name}
        </Text>
        {description && (
          <Text numberOfLines={2} style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 4, lineHeight: 17 }}>
            {description}
          </Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: t.text }}>{price}</Text>
          {originalPrice && (
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textTertiary, textDecorationLine: 'line-through' }}>
              {originalPrice}
            </Text>
          )}
          {calories && (
            <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textTertiary }}>{calories} cal</Text>
          )}
        </View>
      </View>
      <View style={{ width: 100, backgroundColor: t.surfaceActive, alignItems: 'center', justifyContent: 'center' }}>
        <UtensilsCrossed size={28} color={t.textSecondary} />
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
            <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.primaryForeground }}>+</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export const MenuItemCard = React.memo(MenuItemCardBase);
