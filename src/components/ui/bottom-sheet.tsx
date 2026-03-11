import React, { type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius, Shadows, Spacing, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BottomSheetProps = ViewProps & {
  /** Controls the visibility of the bottom sheet */
  visible: boolean;
  /** Callback invoked when the sheet is dismissed */
  onClose: () => void;
  /** Optional title displayed at the top of the sheet */
  title?: string;
  /** Content rendered inside the sheet */
  children?: ReactNode;
  /** Fixed height for the sheet in pixels */
  snapHeight?: number;
};

export function BottomSheet({
  visible,
  onClose,
  title,
  children,
  snapHeight,
  ...props
}: BottomSheetProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" accessibilityViewIsModal>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        {/* Backdrop */}
        <Pressable
          style={{ flex: 1, backgroundColor: t.overlay }}
          onPress={onClose}
        />

        {/* Sheet */}
        <View
          style={[
            {
              borderTopLeftRadius: Radius['3xl'],
              borderTopRightRadius: Radius['3xl'],
              backgroundColor: t.card,
              paddingBottom: insets.bottom + Spacing[4],
              maxHeight: '85%',
              ...Shadows.xl,
            },
            snapHeight ? { height: snapHeight } : undefined,
          ]}
          {...props}>
          {/* Handle */}
          <View style={{ alignItems: 'center', paddingTop: Spacing[3], paddingBottom: Spacing[2] }}>
            <View
              style={{
                width: 40,
                height: 5,
                borderRadius: Radius.full,
                backgroundColor: t.surfaceActive,
              }}
            />
          </View>

          {/* Title */}
          {title && (
            <Text
              style={{
                fontSize: FontSize.xl.fontSize,
                fontWeight: '700',
                paddingHorizontal: Spacing[6],
                paddingBottom: Spacing[5],
                color: t.text,
              }}>
              {title}
            </Text>
          )}

          {/* Content */}
          <ScrollView
            style={{ paddingHorizontal: Spacing[6] }}
            contentContainerStyle={{ paddingBottom: Spacing[2] }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
