import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Switch } from './switch';

export type SettingsItem = {
  key: string;
  label: string;
  icon?: string;
  type: 'toggle' | 'navigation' | 'info';
  value?: boolean | string;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
};

export type SettingsSection = {
  title: string;
  items: SettingsItem[];
};

export type SettingsScreenProps = {
  sections: SettingsSection[];
};

export function SettingsScreen({ sections }: SettingsScreenProps) {
  const t = useTheme();
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.background }}
      contentContainerStyle={{ padding: 16, gap: 24 }}
      accessibilityLabel="Settings"
    >
      {sections.map((section) => (
        <View key={section.title} accessibilityRole="none">
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: t.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 8,
              paddingHorizontal: 4,
            }}
            accessibilityRole="header"
          >
            {section.title}
          </Text>
          <View
            style={{
              backgroundColor: t.card,
              borderRadius: Radius.xl,
              overflow: 'hidden',
              ...Shadows.sm,
            }}
          >
            {section.items.map((item, index) => {
              const isLast = index === section.items.length - 1;
              const isPressed = pressedKey === item.key;

              const rowContent = (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderBottomWidth: isLast ? 0 : 1,
                    borderBottomColor: t.border,
                    opacity: isPressed ? 0.7 : 1,
                  }}
                >
                  {item.icon != null && (
                    <Text style={{ fontSize: 18 }} accessibilityElementsHidden>
                      {item.icon}
                    </Text>
                  )}
                  <Text
                    style={{ flex: 1, fontSize: 16, fontWeight: '500', color: t.text }}
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                  {item.type === 'toggle' && item.onToggle != null && (
                    <View accessibilityElementsHidden>
                      <Switch
                        value={item.value === true}
                        onValueChange={item.onToggle}
                        accessibilityLabel={item.label}
                      />
                    </View>
                  )}
                  {item.type === 'navigation' && (
                    <Text style={{ fontSize: 18, color: t.textSecondary }}>›</Text>
                  )}
                  {item.type === 'info' && item.value != null && (
                    <Text style={{ fontSize: 14, color: t.textSecondary }}>
                      {String(item.value)}
                    </Text>
                  )}
                </View>
              );

              const isPressable =
                (item.type === 'navigation' && item.onPress != null) ||
                (item.type === 'toggle' && item.onToggle != null);

              if (isPressable) {
                return (
                  <Pressable
                    key={item.key}
                    onPress={() => {
                      if (item.type === 'navigation') item.onPress?.();
                      if (item.type === 'toggle') item.onToggle?.(!(item.value === true));
                    }}
                    onPressIn={() => setPressedKey(item.key)}
                    onPressOut={() => setPressedKey(null)}
                    accessibilityRole={item.type === 'toggle' ? 'switch' : 'button'}
                    accessibilityLabel={item.label}
                    accessibilityState={
                      item.type === 'toggle'
                        ? { checked: item.value === true }
                        : undefined
                    }
                    accessibilityHint={
                      item.type === 'navigation' ? 'Navigates to next screen' : undefined
                    }
                  >
                    {rowContent}
                  </Pressable>
                );
              }

              return (
                <View key={item.key} accessibilityRole="none">
                  {rowContent}
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
