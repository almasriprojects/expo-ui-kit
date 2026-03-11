import React from 'react';
import { Pressable, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SegmentedControlProps = ViewProps & {
  /** Array of segment label strings */
  segments: string[];
  /** Index of the currently selected segment */
  selectedIndex: number;
  /** Callback invoked when a segment is selected */
  onIndexChange: (index: number) => void;
  /** Whether the entire control is disabled */
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
            accessibilityRole="tab"
            accessibilityLabel={segment}
            accessibilityState={{ selected, disabled }}
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
                fontSize: FontSize.md.fontSize,
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
