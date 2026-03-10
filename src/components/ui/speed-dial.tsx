import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SpeedDialAction = {
  label: string;
  icon: string;
  onPress: () => void;
  color?: string;
};

type SpeedDialProps = {
  actions: SpeedDialAction[];
  icon?: string;
  openIcon?: string;
};

export function SpeedDial({
  actions,
  icon = '+',
  openIcon = '✕',
}: SpeedDialProps) {
  const [open, setOpen] = useState(false);
  const t = useTheme();

  return (
    <View style={{ position: 'absolute', bottom: 24, right: 24, alignItems: 'flex-end', zIndex: 100 }}>
      {open && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
          style={{ marginBottom: 12, gap: 10 }}>
          {actions.map((action, i) => (
            <Pressable
              key={i}
              onPress={() => {
                setOpen(false);
                action.onPress();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <View
                style={{
                  backgroundColor: t.card,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: Radius.lg,
                  ...Shadows.md,
                }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: t.text }}>
                  {action.label}
                </Text>
              </View>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: Radius.full,
                  backgroundColor: action.color ?? t.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...Shadows.md,
                }}>
                <Text style={{ fontSize: 18 }}>{action.icon}</Text>
              </View>
            </Pressable>
          ))}
        </Animated.View>
      )}

      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={{
          width: 56,
          height: 56,
          borderRadius: Radius.full,
          backgroundColor: open ? t.surfaceActive : t.primary,
          alignItems: 'center',
          justifyContent: 'center',
          ...Shadows.lg,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: open ? t.text : t.primaryForeground,
          }}>
          {open ? openIcon : icon}
        </Text>
      </Pressable>
    </View>
  );
}
