import React, { type ReactNode } from 'react';
import { Dimensions, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type DrawerProps = {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  side?: 'left' | 'right';
  width?: number;
};

export function Drawer({
  visible,
  onClose,
  children,
  title,
  side = 'left',
  width,
}: DrawerProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const screenW = Dimensions.get('window').width;
  const drawerW = width ?? Math.min(screenW * 0.82, 340);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {side === 'right' && (
          <Pressable style={{ flex: 1, backgroundColor: t.overlay }} onPress={onClose} />
        )}
        <View
          style={[
            {
              width: drawerW,
              backgroundColor: t.card,
              paddingTop: insets.top + 16,
              paddingBottom: insets.bottom + 16,
              ...Shadows.xl,
            },
          ]}>
          {title && (
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: t.border,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: t.text }}>
                  {title}
                </Text>
                <Pressable onPress={onClose} hitSlop={12}>
                  <Text style={{ fontSize: 22, color: t.textSecondary }}>✕</Text>
                </Pressable>
              </View>
            </View>
          )}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12 }}
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </View>
        {side === 'left' && (
          <Pressable style={{ flex: 1, backgroundColor: t.overlay }} onPress={onClose} />
        )}
      </View>
    </Modal>
  );
}
