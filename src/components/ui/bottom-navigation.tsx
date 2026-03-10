import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BottomNavTab = {
  key: string;
  label: string;
  icon: string;
  badge?: number;
};

export type BottomNavigationProps = {
  tabs: BottomNavTab[];
  activeKey: string;
  onTabPress: (key: string) => void;
};

export function BottomNavigation({
  tabs,
  activeKey,
  onTabPress,
}: BottomNavigationProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: t.card,
        borderTopWidth: 1,
        borderTopColor: t.border,
        paddingTop: 12,
        paddingBottom: Math.max(insets.bottom, 12),
      }}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        const isPressed = tab.key === pressedKey;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            onPressIn={() => setPressedKey(tab.key)}
            onPressOut={() => setPressedKey(null)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
              opacity: isPressed ? 0.7 : 1,
            }}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}>
            <View style={{ position: 'relative' }}>
              <Text
                style={{
                  fontSize: 24,
                  color: isActive ? t.primary : t.textTertiary,
                }}>
                {tab.icon}
              </Text>
              {tab.badge != null && tab.badge > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -10,
                    minWidth: 18,
                    height: 18,
                    borderRadius: Radius.full,
                    backgroundColor: t.error,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '600',
                      color: t.textOnColor,
                    }}
                    numberOfLines={1}>
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                color: isActive ? t.primary : t.textTertiary,
                fontWeight: isActive ? '600' : '400',
              }}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
