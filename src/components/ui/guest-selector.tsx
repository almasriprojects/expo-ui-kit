import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type GuestType = {
  /** Guest category label (e.g. "Adults") */
  label: string;
  /** Additional description below the label */
  sublabel?: string;
  /** Current guest count */
  count: number;
  /** Minimum allowed count */
  min?: number;
  /** Maximum allowed count */
  max?: number;
};

export type GuestSelectorProps = {
  /** Array of guest categories with counts */
  guests: GuestType[];
  /** Callback fired when a guest count changes */
  onChange: (index: number, count: number) => void;
  /** Custom styles applied to the container */
  style?: ViewStyle;
};

export function GuestSelector({ guests, onChange, style }: GuestSelectorProps) {
  const t = useTheme();

  return (
    <View style={[{ gap: 4 }, style]}>
      {guests.map((g, i) => {
        const min = g.min ?? 0;
        const max = g.max ?? 10;
        const isLast = i === guests.length - 1;

        return (
          <View key={i}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 14,
              }}>
              <View>
                <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{g.label}</Text>
                {g.sublabel && (
                  <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, marginTop: 1 }}>
                    {g.sublabel}
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <Pressable
                  onPress={() => g.count > min && onChange(i, g.count - 1)}
                  disabled={g.count <= min}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: Radius.full,
                    borderWidth: 1.5,
                    borderColor: g.count <= min ? t.surfaceActive : t.borderStrong,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: g.count <= min ? 0.4 : 1,
                  }}>
                  <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '300', color: t.text, marginTop: -1 }}>−</Text>
                </Pressable>
                <Text
                  style={{
                    fontSize: FontSize.lg.fontSize,
                    fontWeight: '600',
                    color: t.text,
                    minWidth: 20,
                    textAlign: 'center',
                  }}>
                  {g.count}
                </Text>
                <Pressable
                  onPress={() => g.count < max && onChange(i, g.count + 1)}
                  disabled={g.count >= max}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: Radius.full,
                    borderWidth: 1.5,
                    borderColor: g.count >= max ? t.surfaceActive : t.borderStrong,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: g.count >= max ? 0.4 : 1,
                  }}>
                  <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '300', color: t.text, marginTop: -1 }}>+</Text>
                </Pressable>
              </View>
            </View>
            {!isLast && <View style={{ height: 1, backgroundColor: t.border }} />}
          </View>
        );
      })}
    </View>
  );
}
