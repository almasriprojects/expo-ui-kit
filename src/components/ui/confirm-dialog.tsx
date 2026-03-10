import React from 'react';
import { Modal, Pressable, View, Dimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ConfirmDialogProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

export function ConfirmDialog({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
}: ConfirmDialogProps) {
  const t = useTheme();
  const width = Math.min(Dimensions.get('window').width - 48, 340);

  return (
    <Modal visible={visible} transparent animationType="fade" accessibilityViewIsModal>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: t.overlay,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{
            width,
            backgroundColor: t.background,
            borderRadius: Radius['2xl'],
            padding: 24,
            ...Shadows.xl,
          }}>
          <ThemedText style={{ fontSize: 17, fontWeight: '700', textAlign: 'center', color: t.text }}>
            {title}
          </ThemedText>
          {message && (
            <ThemedText
              style={{
                fontSize: 14,
                color: t.textSecondary,
                textAlign: 'center',
                marginTop: 8,
                lineHeight: 20,
              }}>
              {message}
            </ThemedText>
          )}
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <Pressable
              onPress={onClose}
              style={{
                flex: 1,
                paddingVertical: 13,
                borderRadius: Radius.lg,
                backgroundColor: t.surface,
                alignItems: 'center',
              }}>
              <ThemedText style={{ fontSize: 15, fontWeight: '600', color: t.text }}>{cancelLabel}</ThemedText>
            </Pressable>
            <Pressable
              onPress={() => {
                onConfirm();
                onClose();
              }}
              style={{
                flex: 1,
                paddingVertical: 13,
                borderRadius: Radius.lg,
                backgroundColor: destructive ? t.error : t.primaryPressed,
                alignItems: 'center',
              }}>
              <ThemedText style={{ color: t.primaryForeground, fontSize: 15, fontWeight: '600' }}>
                {confirmLabel}
              </ThemedText>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
