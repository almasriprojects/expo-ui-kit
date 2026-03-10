import React, { type ReactNode, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  width?: number;
};

export function Popover({ trigger, children, width = 220 }: PopoverProps) {
  const t = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>{trigger}</Pressable>
      <Modal visible={visible} transparent animationType="fade">
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: t.overlayLight,
            }}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View
                style={{
                  width,
                  backgroundColor: t.background,
                  borderRadius: Radius.xl,
                  padding: 12,
                  ...Shadows.lg,
                }}>
                {children}
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
