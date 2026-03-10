import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Fonts, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ColorPickerProps = {
  colors: string[];
  value: string;
  onValueChange: (color: string) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
};

const dotSizes = { sm: 28, md: 36, lg: 48 };

export function ColorPicker({
  colors,
  value,
  onValueChange,
  label,
  size = 'md',
  style,
}: ColorPickerProps) {
  const t = useTheme();
  const dim = dotSizes[size];

  return (
    <View style={style}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '600', color: t.text, marginBottom: 10 }}>
          {label}
        </Text>
      )}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {colors.map((color, idx) => {
          const selected = color === value;
          return (
            <Pressable
              key={`${idx}-${color}`}
              onPress={() => onValueChange(color)}
              style={{
                width: dim,
                height: dim,
                borderRadius: Radius.full,
                backgroundColor: color,
                borderWidth: selected ? 3 : 2,
                borderColor: selected ? t.text : t.border,
                alignItems: 'center',
                justifyContent: 'center',
                ...(selected ? Shadows.md : {}),
              }}>
              {selected && (
                <Text
                  style={{
                    fontSize: dim * 0.35,
                    fontWeight: '700',
                    color: isLight(color) ? t.text : t.textOnColor,
                  }}>
                  ✓
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
      {value && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: Radius.sm,
              backgroundColor: value,
              borderWidth: 1,
              borderColor: t.border,
            }}
          />
          <Text style={{ fontSize: 13, color: t.textSecondary, fontFamily: Fonts?.mono ?? 'monospace' }}>
            {value.toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
}

function isLight(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
