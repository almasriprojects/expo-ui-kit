import React from 'react';
import { Modal, Pressable, View, Dimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadows, Spacing, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ConfirmDialogProps = {
  /** Controls the visibility of the dialog */
  visible: boolean;
  /** Callback invoked when the dialog is dismissed */
  onClose: () => void;
  /** Callback invoked when the confirm button is pressed */
  onConfirm: () => void;
  /** Dialog heading text */
  title: string;
  /** Optional descriptive message below the title */
  message?: string;
  /** Label for the confirm button */
  confirmLabel?: string;
  /** Label for the cancel button */
  cancelLabel?: string;
  /** Whether the confirm action is destructive */
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
            padding: Spacing[6],
            ...Shadows.xl,
          }}>
          <ThemedText style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', textAlign: 'center', color: t.text }}>
            {title}
          </ThemedText>
          {message && (
            <ThemedText
              style={{
                fontSize: FontSize.md.fontSize,
                color: t.textSecondary,
                textAlign: 'center',
                marginTop: Spacing[2],
                lineHeight: 20,
              }}>
              {message}
            </ThemedText>
          )}
          <View style={{ flexDirection: 'row', gap: Spacing[3], marginTop: Spacing[6] }}>
            <Pressable
              onPress={onClose}
              style={{
                flex: 1,
                paddingVertical: 13,
                borderRadius: Radius.lg,
                backgroundColor: t.surface,
                alignItems: 'center',
              }}>
              <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{cancelLabel}</ThemedText>
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
              <ThemedText style={{ color: t.primaryForeground, fontSize: FontSize.md.fontSize, fontWeight: '600' }}>
                {confirmLabel}
              </ThemedText>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
