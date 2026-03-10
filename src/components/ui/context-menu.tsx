import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ContextMenuItem = {
  key: string;
  label: string;
  icon?: string;
  destructive?: boolean;
  disabled?: boolean;
};

export type ContextMenuProps = {
  items: ContextMenuItem[];
  onItemPress: (item: ContextMenuItem) => void;
  children: React.ReactNode;
};

export function ContextMenu({ items, onItemPress, children }: ContextMenuProps) {
  const t = useTheme();
  const [visible, setVisible] = useState(false);

  const handleLongPress = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleItemPress = (item: ContextMenuItem) => {
    if (item.disabled) return;
    onItemPress(item);
    setVisible(false);
  };

  return (
    <>
      <Pressable onLongPress={handleLongPress}>{children}</Pressable>

      <Modal visible={visible} transparent animationType="fade" accessibilityViewIsModal>
        <Pressable style={{ flex: 1, backgroundColor: t.overlay }} onPress={handleClose}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
              style={{
                minWidth: 200,
                backgroundColor: t.card,
                borderRadius: Radius.lg,
                overflow: 'hidden',
                ...Shadows.lg,
              }}
              onPress={(e) => e.stopPropagation()}>
              {items.map((item, index) => (
                <Pressable
                  key={item.key}
                  onPress={() => handleItemPress(item)}
                  disabled={item.disabled}
                  accessibilityRole="button"
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    gap: 12,
                    backgroundColor: item.disabled
                      ? 'transparent'
                      : pressed
                        ? t.cardPressed
                        : 'transparent',
                    borderTopWidth: index > 0 ? 1 : 0,
                    borderTopColor: t.border,
                  })}>
                  {item.icon != null && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: item.disabled
                          ? t.textTertiary
                          : item.destructive
                            ? t.error
                            : t.text,
                      }}>
                      {item.icon}
                    </Text>
                  )}
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 15,
                      fontWeight: '500',
                      color: item.disabled
                        ? t.textTertiary
                        : item.destructive
                          ? t.error
                          : t.text,
                    }}>
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
