import React from 'react';
import { Pressable, ScrollView, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FilterOption = {
  value: string;
  label: string;
  icon?: string;
  count?: number;
};

type FilterBarProps = {
  options: FilterOption[];
  value: string;
  onValueChange: (value: string) => void;
  style?: ViewStyle;
};

export function FilterBar({ options, value, onValueChange, style }: FilterBarProps) {
  const t = useTheme();

  return (
    <View style={style}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 4, paddingVertical: 4 }}>
        {options.map((option) => {
          const active = option.value === value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onValueChange(option.value)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: Radius.full,
                backgroundColor: active ? t.primary : t.surface,
                borderWidth: active ? 0 : 1,
                borderColor: t.border,
                ...(active ? Shadows.sm : {}),
              }}>
              {option.icon && <Text style={{ fontSize: 14 }}>{option.icon}</Text>}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: active ? '600' : '500',
                  color: active ? t.primaryForeground : t.text,
                }}>
                {option.label}
              </Text>
              {option.count != null && (
                <View
                  style={{
                    backgroundColor: active ? t.surfaceOnColorStrong : t.surfaceActive,
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    borderRadius: Radius.full,
                    minWidth: 20,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: active ? t.primaryForeground : t.textSecondary,
                    }}>
                    {option.count}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
