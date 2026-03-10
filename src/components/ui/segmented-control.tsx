import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SegmentedControlProps = ViewProps & {
  segments: string[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  disabled?: boolean;
};

export function SegmentedControl({
  segments,
  selectedIndex,
  onIndexChange,
  disabled = false,
  style,
  ...props
}: SegmentedControlProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: t.segmentBackground,
          borderRadius: Radius.xl,
          padding: 4,
          opacity: disabled ? 0.5 : 1,
        },
        typeof style === 'object' ? style : undefined,
      ]}
      {...props}>
      {segments.map((segment, i) => {
        const selected = i === selectedIndex;
        return (
          <Pressable
            key={segment}
            onPress={() => !disabled && onIndexChange(i)}
            style={[
              {
                flex: 1,
                paddingVertical: 8,
                borderRadius: Radius.md,
                alignItems: 'center',
              },
              selected && {
                backgroundColor: t.segmentActive,
                ...Shadows.sm,
              },
            ]}>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: t.text,
                opacity: selected ? 1 : 0.55,
              }}>
              {segment}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}
