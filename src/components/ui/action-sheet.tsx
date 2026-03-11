import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius, Shadows, Spacing, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ActionSheetOption = {
  /** Display text for the option */
  label: string;
  /** Callback invoked when the option is pressed */
  onPress: () => void;
  /** Whether the option is styled as a destructive action */
  destructive?: boolean;
};

export type ActionSheetProps = {
  /** Controls the visibility of the action sheet */
  visible: boolean;
  /** Callback invoked when the sheet is dismissed */
  onClose: () => void;
  /** Optional title displayed at the top of the sheet */
  title?: string;
  /** Optional descriptive message below the title */
  message?: string;
  /** List of selectable action options */
  options: ActionSheetOption[];
  /** Label for the cancel button */
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
            paddingBottom: insets.bottom + Spacing[2],
            paddingHorizontal: Spacing[3],
          }}>
          {/* Options group */}
          <View
            style={{
              borderRadius: Radius['2xl'],
              overflow: 'hidden',
              marginBottom: Spacing[2],
              backgroundColor: t.card,
              ...Shadows.lg,
            }}>
            {(title || message) && (
              <View
                style={{
                  paddingHorizontal: Spacing[5],
                  paddingTop: 18,
                  paddingBottom: Spacing[3.5],
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: t.border,
                }}>
                {title && (
                  <Text
                    style={{
                      fontSize: FontSize.md.fontSize,
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
                      fontSize: FontSize.sm.fontSize,
                      textAlign: 'center',
                      marginTop: Spacing[1],
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
                    paddingVertical: Spacing[4],
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: FontSize.xl.fontSize,
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
              paddingVertical: Spacing[4],
              alignItems: 'center',
              backgroundColor: t.card,
              ...Shadows.md,
            }}>
            <Text
              style={{
                fontSize: FontSize.xl.fontSize,
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
