import React, { type ReactNode } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Copy, Mail, MessageCircle, MoreHorizontal } from 'lucide-react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ShareOption = {
  key: string;
  label: string;
  icon: ReactNode;
};

export type ShareSheetProps = {
  visible: boolean;
  onClose: () => void;
  options?: ShareOption[];
  onSelect: (key: string) => void;
  style?: ViewStyle;
};

function BrandCircle({ letter, color }: { letter: string; color: string }) {
  return (
    <Text style={{ fontSize: 16, fontWeight: '800', color }}>{letter}</Text>
  );
}

export function ShareSheet({
  visible,
  onClose,
  options,
  onSelect,
  style,
}: ShareSheetProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  const defaultOptions: ShareOption[] = [
    { key: 'copy', label: 'Copy Link', icon: <Copy size={24} color={t.text} /> },
    { key: 'messages', label: 'Messages', icon: <MessageCircle size={24} color={t.text} /> },
    { key: 'mail', label: 'Mail', icon: <Mail size={24} color={t.text} /> },
    { key: 'twitter', label: 'Twitter', icon: <BrandCircle letter="X" color={t.text} /> },
    { key: 'facebook', label: 'Facebook', icon: <BrandCircle letter="f" color="#1877F2" /> },
    { key: 'whatsapp', label: 'WhatsApp', icon: <BrandCircle letter="W" color="#25D366" /> },
    { key: 'more', label: 'More', icon: <MoreHorizontal size={24} color={t.text} /> },
  ];

  const resolvedOptions = options ?? defaultOptions;

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
          {resolvedOptions.map((opt) => (
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
                {opt.icon}
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
