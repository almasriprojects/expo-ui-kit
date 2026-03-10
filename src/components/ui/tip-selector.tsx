import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Pressable,
  View,
  type ViewStyle,
} from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TipSelectorProps = {
  options?: number[];
  subtotal: number;
  selected?: number;
  customTip?: number;
  onTipChange: (percentage: number, amount: number) => void;
  currency?: string;
  style?: ViewStyle;
};

const DEFAULT_OPTIONS = [15, 20, 25];

export function TipSelector({
  options = DEFAULT_OPTIONS,
  subtotal,
  selected,
  customTip,
  onTipChange,
  currency = '$',
  style,
}: TipSelectorProps) {
  const t = useTheme();
  const [showCustom, setShowCustom] = useState(false);
  const [customInput, setCustomInput] = useState(
    customTip != null ? String(customTip) : '',
  );

  const isCustomSelected = selected == null && (customTip != null || showCustom);
  const tipAmount =
    selected != null
      ? (subtotal * selected) / 100
      : customTip != null
        ? customTip
        : customInput ? parseFloat(customInput) || 0 : 0;

  const handleOptionSelect = (pct: number) => {
    setShowCustom(false);
    setCustomInput('');
    const amount = (subtotal * pct) / 100;
    onTipChange(pct, amount);
  };

  const handleCustomPress = () => {
    setShowCustom(true);
    onTipChange(0, 0);
  };

  const handleCustomSubmit = () => {
    const val = parseFloat(customInput) || 0;
    const pct = subtotal > 0 ? (val / subtotal) * 100 : 0;
    onTipChange(pct, val);
  };

  return (
    <View
      style={[
        {
          gap: 12,
        },
        style,
      ]}
      accessibilityRole="none"
      accessibilityLabel="Tip selector">
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          alignItems: 'center',
        }}>
        {options.map((pct) => {
          const isSelected = selected === pct;
          const amount = (subtotal * pct) / 100;

          return (
            <Pressable
              key={pct}
              onPress={() => handleOptionSelect(pct)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: Radius.lg,
                backgroundColor: isSelected ? t.primary : t.surface,
                borderWidth: 1.5,
                borderColor: isSelected ? t.primary : t.border,
              }}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${pct}% tip, ${currency}${amount.toFixed(2)}`}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: isSelected ? t.primaryForeground : t.text,
                }}>
                {pct}%
              </Text>
            </Pressable>
          );
        })}
        <Pressable
          onPress={handleCustomPress}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: Radius.lg,
            backgroundColor: isCustomSelected ? t.primary : t.surface,
            borderWidth: 1.5,
            borderColor: isCustomSelected ? t.primary : t.border,
          }}
          accessibilityRole="radio"
          accessibilityState={{ selected: isCustomSelected }}
          accessibilityLabel="Custom tip amount">
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: isCustomSelected ? t.primaryForeground : t.text,
            }}>
            Custom
          </Text>
        </Pressable>
      </View>

      {showCustom && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 14, color: t.textSecondary }}>{currency}</Text>
          <TextInput
            value={customInput}
            onChangeText={setCustomInput}
            onBlur={handleCustomSubmit}
            placeholder="0.00"
            placeholderTextColor={t.textTertiary}
            keyboardType="decimal-pad"
            style={{
              flex: 1,
              minHeight: 44,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: Radius.lg,
              backgroundColor: t.surface,
              borderWidth: 1.5,
              borderColor: t.border,
              fontSize: 16,
              color: t.text,
            }}
            accessibilityLabel="Custom tip amount"
            accessibilityHint="Enter tip amount in dollars"
          />
        </View>
      )}

      {tipAmount > 0 && (
        <Text
          style={{
            fontSize: 14,
            color: t.textSecondary,
          }}
          accessibilityLiveRegion="polite">
          Tip amount: {currency}{tipAmount.toFixed(2)}
        </Text>
      )}
    </View>
  );
}
