import React, { type ReactNode } from 'react';
import {
  Dimensions,
  Modal as RNModal,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
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
          paddingHorizontal: 24,
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
          {title && (
            <ThemedText
              style={{ fontSize: 18, fontWeight: '700', marginBottom: 4, color: t.text }}>
              {title}
            </ThemedText>
          )}
          {description && (
            <ThemedText
              style={{
                fontSize: 14,
                color: t.textSecondary,
                marginBottom: 16,
                lineHeight: 20,
              }}>
              {description}
            </ThemedText>
          )}
          {children && (
            <ScrollView
              style={{ maxHeight: 300, marginBottom: 16 }}
              showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          )}
          {actions && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 12,
              }}>
              {actions}
            </View>
          )}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
