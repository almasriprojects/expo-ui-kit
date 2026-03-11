import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Plus, X } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SpeedDialAction = {
  /** Label text displayed alongside the action */
  label: string;
  /** Emoji icon for the action button */
  icon: string;
  /** Callback invoked when the action is pressed */
  onPress: () => void;
  /** Custom background color for the action button */
  color?: string;
};

export type SpeedDialProps = {
  /** Array of actions displayed when the dial is open */
  actions: SpeedDialAction[];
  /** Custom icon for the closed state FAB */
  icon?: React.ReactNode;
  /** Custom icon for the open state FAB */
  openIcon?: React.ReactNode;
};

export function SpeedDial({
  actions,
  icon,
  openIcon,
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
                <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.text }}>
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
                <Text style={{ fontSize: FontSize.xl.fontSize }}>{action.icon}</Text>
              </View>
            </Pressable>
          ))}
        </Animated.View>
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={open ? 'Close speed dial' : 'Open speed dial'}
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
        {open ? (
          openIcon ?? <X size={24} color={t.text} />
        ) : (
          icon ?? <Plus size={24} color={t.primaryForeground} />
        )}
      </Pressable>
    </View>
  );
}
