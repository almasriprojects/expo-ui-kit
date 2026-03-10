import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ShareOption = {
  key: string;
  label: string;
  icon: string;
};

const DEFAULT_OPTIONS: ShareOption[] = [
  { key: 'copy', label: 'Copy Link', icon: '📋' },
  { key: 'messages', label: 'Messages', icon: '💬' },
  { key: 'mail', label: 'Mail', icon: '✉️' },
  { key: 'twitter', label: 'Twitter', icon: '𝕏' },
  { key: 'facebook', label: 'Facebook', icon: '📘' },
  { key: 'whatsapp', label: 'WhatsApp', icon: '📱' },
  { key: 'more', label: 'More', icon: '⋯' },
];

export type ShareSheetProps = {
  visible: boolean;
  onClose: () => void;
  options?: ShareOption[];
  onSelect: (key: string) => void;
  style?: ViewStyle;
};

export function ShareSheet({
  visible,
  onClose,
  options = DEFAULT_OPTIONS,
  onSelect,
  style,
}: ShareSheetProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  const handleSelect = (key: string) => {
    onSelect(key);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      accessibilityViewIsModal
      accessibilityLabel="Share options">
      <View style={{ flex: 1 }}>
        <Pressable
          style={{ flex: 1, backgroundColor: t.overlay }}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close share sheet" />
        <View
        style={[
          {
            backgroundColor: t.card,
            borderTopLeftRadius: Radius['3xl'],
            borderTopRightRadius: Radius['3xl'],
            paddingBottom: insets.bottom + 16,
            paddingHorizontal: 24,
            ...Shadows.xl,
          },
          style,
        ]}>
        <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 20 }}>
          <View
            style={{
              width: 40,
              height: 5,
              borderRadius: Radius.full,
              backgroundColor: t.surfaceActive,
            }}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20, paddingBottom: 8 }}>
          {options.map((opt) => (
            <Pressable
              key={opt.key}
              onPress={() => handleSelect(opt.key)}
              style={{
                alignItems: 'center',
                width: 72,
              }}
              accessibilityRole="button"
              accessibilityLabel={opt.label}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: Radius.full,
                  backgroundColor: t.surface,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}>
                <Text style={{ fontSize: 24 }}>{opt.icon}</Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: t.textSecondary,
                  textAlign: 'center',
                }}
                numberOfLines={1}>
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
