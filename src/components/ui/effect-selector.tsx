import React from 'react';
import { Image, Pressable, ScrollView, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type EffectOption = {
  /** Unique identifier */
  id: string;
  /** Display label shown below the preview */
  label: string;
  /** Preview image URI */
  previewUri?: string;
  /** Fallback background color if no image */
  color?: string;
};

export type EffectSelectorProps = {
  /** Array of available effects */
  effects: EffectOption[];
  /** Currently selected effect ID */
  selected: string;
  /** Callback when an effect is selected */
  onSelect: (id: string) => void;
  /** Size of each preview circle */
  size?: number;
  /** Optional container style */
  style?: ViewStyle;
};

export function EffectSelector({
  effects,
  selected,
  onSelect,
  size = 64,
  style,
}: EffectSelectorProps) {
  const t = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: Spacing[3], paddingHorizontal: Spacing[2] }}
      style={style}>
      {effects.map((effect) => {
        const isActive = effect.id === selected;

        return (
          <Pressable
            key={effect.id}
            onPress={() => onSelect(effect.id)}
            style={{ alignItems: 'center', gap: Spacing[1] }}>
            <View
              style={{
                width: size,
                height: size,
                borderRadius: Radius.full,
                overflow: 'hidden',
                borderWidth: isActive ? 3 : 0,
                borderColor: isActive ? t.primary : 'transparent',
                backgroundColor: effect.color ?? t.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {effect.previewUri ? (
                <Image
                  source={{ uri: effect.previewUri }}
                  style={{ width: size, height: size }}
                  resizeMode="cover"
                />
              ) : null}
            </View>
            <Text
              style={{
                fontSize: FontSize['2xs'].fontSize,
                color: isActive ? t.primary : t.textSecondary,
                fontWeight: isActive ? '600' : '400',
                textAlign: 'center',
              }}
              numberOfLines={1}>
              {effect.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
