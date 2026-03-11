import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';

import { Fonts, Radius, Shadows, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ColorPickerProps = {
  /** Array of hex color strings to choose from */
  colors: string[];
  /** Currently selected color hex string */
  value: string;
  /** Callback invoked when a color is selected */
  onValueChange: (color: string) => void;
  /** Label text displayed above the color grid */
  label?: string;
  /** Size preset for the color dots */
  size?: 'sm' | 'md' | 'lg';
  /** Custom styles for the outer container */
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
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text, marginBottom: 10 }}>
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
                <Check size={dim * 0.4} color={isLight(color) ? t.text : t.textOnColor} strokeWidth={3} />
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
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, fontFamily: Fonts?.mono ?? 'monospace' }}>
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
