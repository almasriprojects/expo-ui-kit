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

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BottomSheetProps = ViewProps & {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
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
              paddingBottom: insets.bottom + 16,
              maxHeight: '85%',
              ...Shadows.xl,
            },
            snapHeight ? { height: snapHeight } : undefined,
          ]}
          {...props}>
          {/* Handle */}
          <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 8 }}>
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
                fontSize: 20,
                fontWeight: '700',
                paddingHorizontal: 24,
                paddingBottom: 20,
                color: t.text,
              }}>
              {title}
            </Text>
          )}

          {/* Content */}
          <ScrollView
            style={{ paddingHorizontal: 24 }}
            contentContainerStyle={{ paddingBottom: 8 }}
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
