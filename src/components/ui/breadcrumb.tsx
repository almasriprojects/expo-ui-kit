import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type BreadcrumbItem = {
  label: string;
  onPress?: () => void;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: string;
};

export function Breadcrumb({ items, separator = '/' }: BreadcrumbProps) {
  const t = useTheme();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            {index > 0 && (
              <Text style={{ fontSize: 14, color: t.textTertiary }}>{separator}</Text>
            )}
            {isLast ? (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: t.text,
                }}>
                {item.label}
              </Text>
            ) : item.onPress ? (
              <Pressable
                onPress={item.onPress}
                accessibilityRole="link"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                })}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: t.primary,
                  }}>
                  {item.label}
                </Text>
              </Pressable>
            ) : (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: t.textSecondary,
                }}>
                {item.label}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}
