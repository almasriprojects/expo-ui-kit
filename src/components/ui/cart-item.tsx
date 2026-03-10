import React from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import { Image } from 'expo-image';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CartItemProps = ViewProps & {
  title: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  symbol?: string;
  onQuantityChange?: (qty: number) => void;
  onRemove?: () => void;
};

export function CartItem({
  title,
  price,
  quantity,
  image,
  variant,
  symbol = '$',
  onQuantityChange,
  onRemove,
  style,
  ...props
}: CartItemProps) {
  const t = useTheme();

  return (
    <View
      style={[{ flexDirection: 'row', paddingVertical: 12, gap: 12 }, typeof style === 'object' ? style : undefined]}
      {...props}>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: Radius.lg,
          backgroundColor: t.surface,
          overflow: 'hidden',
        }}>
        {image && (
          <Image source={image} style={{ width: 72, height: 72 }} contentFit="cover" />
        )}
      </View>

      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }} numberOfLines={2}>
            {title}
          </Text>
          {variant && (
            <Text style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>
              {variant}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: t.text }}>
            {symbol}{(price * quantity).toFixed(2)}
          </Text>

          {onQuantityChange && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Pressable
                onPress={() => quantity > 1 && onQuantityChange(quantity - 1)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: Radius.md,
                  backgroundColor: t.surface,
                  borderWidth: 1,
                  borderColor: t.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: t.text }}>−</Text>
              </Pressable>
              <View style={{ width: 36, alignItems: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: t.text }}>{quantity}</Text>
              </View>
              <Pressable
                onPress={() => onQuantityChange(quantity + 1)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: Radius.md,
                  backgroundColor: t.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: t.primaryForeground }}>+</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {onRemove && (
        <Pressable onPress={onRemove} hitSlop={8} style={{ paddingTop: 2 }}>
          <Text style={{ fontSize: 14, color: t.textSecondary }}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}
