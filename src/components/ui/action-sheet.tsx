import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ActionSheetOption = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type ActionSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  options: ActionSheetOption[];
  cancelLabel?: string;
};

export function ActionSheet({
  visible,
  onClose,
  title,
  message,
  options,
  cancelLabel = 'Cancel',
}: ActionSheetProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" accessibilityViewIsModal>
      <Pressable
        style={{ flex: 1, backgroundColor: t.overlay, justifyContent: 'flex-end' }}
        onPress={onClose}>
        <View
          style={{
            paddingBottom: insets.bottom + 8,
            paddingHorizontal: 12,
          }}>
          {/* Options group */}
          <View
            style={{
              borderRadius: Radius['2xl'],
              overflow: 'hidden',
              marginBottom: 8,
              backgroundColor: t.card,
              ...Shadows.lg,
            }}>
            {(title || message) && (
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 18,
                  paddingBottom: 14,
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: t.border,
                }}>
                {title && (
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      textAlign: 'center',
                      color: t.text,
                    }}>
                    {title}
                  </Text>
                )}
                {message && (
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: 'center',
                      marginTop: 4,
                      color: t.textSecondary,
                      lineHeight: 18,
                    }}>
                    {message}
                  </Text>
                )}
              </View>
            )}
            {options.map((option, i) => (
              <React.Fragment key={i}>
                {i > 0 || title || message ? (
                  <View style={{ height: 1, backgroundColor: t.border }} />
                ) : null}
                <Pressable
                  onPress={() => {
                    option.onPress();
                    onClose();
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={option.label}
                  style={{
                    paddingVertical: 16,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: option.destructive ? '600' : '400',
                      color: option.destructive ? t.error : t.primary,
                    }}>
                    {option.label}
                  </Text>
                </Pressable>
              </React.Fragment>
            ))}
          </View>

          {/* Cancel button */}
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
            style={{
              borderRadius: Radius['2xl'],
              paddingVertical: 16,
              alignItems: 'center',
              backgroundColor: t.card,
              ...Shadows.md,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: t.primary,
              }}>
              {cancelLabel}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
