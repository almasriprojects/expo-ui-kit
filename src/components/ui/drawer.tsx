import React, { type ReactNode } from 'react';
import { Dimensions, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FontSize, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DrawerProps = {
  /** Whether the drawer is visible */
  visible: boolean;
  /** Callback fired when the drawer is dismissed */
  onClose: () => void;
  /** Content rendered inside the drawer */
  children?: ReactNode;
  /** Title text displayed at the top of the drawer */
  title?: string;
  /** Side of the screen the drawer slides from */
  side?: 'left' | 'right';
  /** Custom width of the drawer in pixels */
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
              paddingTop: insets.top + Spacing[4],
              paddingBottom: insets.bottom + Spacing[4],
              ...Shadows.xl,
            },
          ]}>
          {title && (
            <View
              style={{
                paddingHorizontal: Spacing[5],
                paddingBottom: Spacing[4],
                borderBottomWidth: 1,
                borderBottomColor: t.border,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: FontSize.xl.fontSize, fontWeight: '700', color: t.text }}>
                  {title}
                </Text>
                <Pressable onPress={onClose} hitSlop={12}>
                  <X size={22} color={t.textSecondary} />
                </Pressable>
              </View>
            </View>
          )}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: Spacing[5], paddingTop: Spacing[3] }}
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
