import React from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import { Image } from 'expo-image';
import { X } from 'lucide-react-native';

import { Radius, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CartItemProps = ViewProps & {
  /** Product name or description */
  title: string;
  /** Unit price of the item */
  price: number;
  /** Current quantity in the cart */
  quantity: number;
  /** URL of the product image */
  image?: string;
  /** Product variant description (e.g. size, color) */
  variant?: string;
  /** Currency symbol displayed before the price */
  symbol?: string;
  /** Callback invoked when quantity is changed */
  onQuantityChange?: (qty: number) => void;
  /** Callback invoked when the item is removed */
  onRemove?: () => void;
};

function CartItemBase({
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
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }} numberOfLines={2}>
            {title}
          </Text>
          {variant && (
            <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 2 }}>
              {variant}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.text }}>
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
                <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: t.text }}>−</Text>
              </Pressable>
              <View style={{ width: 36, alignItems: 'center' }}>
                <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{quantity}</Text>
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
                <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: t.primaryForeground }}>+</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {onRemove && (
        <Pressable onPress={onRemove} hitSlop={8} style={{ paddingTop: 2 }}>
          <X size={14} color={t.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

export const CartItem = React.memo(CartItemBase);
