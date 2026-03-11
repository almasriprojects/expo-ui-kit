import React, { type ReactNode } from 'react';
import {
  Dimensions,
  Modal as RNModal,
  Pressable,
  ScrollView,
  View,
  type ViewStyle,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ModalProps = {
  /** Whether the modal is visible */
  visible: boolean;
  /** Callback invoked when the modal is dismissed */
  onClose: () => void;
  /** Title text displayed at the top of the modal */
  title?: string;
  /** Description text displayed below the title */
  description?: string;
  /** Content rendered inside the modal body */
  children?: ReactNode;
  /** Action buttons rendered at the bottom of the modal */
  actions?: ReactNode;
  /** Maximum width preset for the modal */
  size?: 'sm' | 'md' | 'lg';
  /** Custom styles applied to the modal content container */
  contentStyle?: ViewStyle;
};

const maxWidths = { sm: 320, md: 400, lg: 480 };

export function Modal({
  visible,
  onClose,
  title,
  description,
  children,
  actions,
  size = 'md',
  contentStyle,
}: ModalProps) {
  const t = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const width = Math.min(screenWidth - 48, maxWidths[size]);

  return (
    <RNModal visible={visible} transparent animationType="fade" accessibilityViewIsModal>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: t.overlay,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: Spacing[6],
        }}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          accessibilityRole="alert"
          accessibilityLabel={title}
          style={[{
            width,
            backgroundColor: t.background,
            borderRadius: Radius['2xl'],
            padding: Spacing[6],
            ...Shadows.xl,
          }, contentStyle]}>
          {title && (
            <ThemedText
              style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', marginBottom: Spacing[1], color: t.text }}>
              {title}
            </ThemedText>
          )}
          {description && (
            <ThemedText
              style={{
                fontSize: FontSize.md.fontSize,
                color: t.textSecondary,
                marginBottom: Spacing[4],
                lineHeight: 20,
              }}>
              {description}
            </ThemedText>
          )}
          {children && (
            <ScrollView
              style={{ maxHeight: 300, marginBottom: Spacing[4] }}
              showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          )}
          {actions && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: Spacing[3],
              }}>
              {actions}
            </View>
          )}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
