import React, { useState } from 'react';
import { Modal, Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type MenuItem = {
  label: string;
  icon?: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
};

type MenuGroup = {
  items: MenuItem[];
};

type DropdownMenuProps = {
  trigger: React.ReactNode;
  groups: MenuGroup[];
  style?: ViewStyle;
};

export function DropdownMenu({ trigger, groups, style }: DropdownMenuProps) {
  const [visible, setVisible] = useState(false);
  const t = useTheme();

  return (
    <View style={style}>
      <Pressable onPress={() => setVisible(true)}>{trigger}</Pressable>
      <Modal visible={visible} transparent animationType="fade">
        <Pressable
          style={{ flex: 1, backgroundColor: t.overlayLight }}
          onPress={() => setVisible(false)}>
          <View
            style={{
              position: 'absolute',
              top: '30%',
              left: 24,
              right: 24,
              backgroundColor: t.card,
              borderRadius: Radius.xl,
              overflow: 'hidden',
              ...Shadows.xl,
            }}>
            {groups.map((group, gi) => (
              <View key={gi}>
                {gi > 0 && (
                  <View style={{ height: 1, backgroundColor: t.border, marginHorizontal: 12 }} />
                )}
                {group.items.map((item, ii) => (
                  <Pressable
                    key={ii}
                    onPress={() => {
                      setVisible(false);
                      if (!item.disabled) item.onPress();
                    }}
                    disabled={item.disabled}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      opacity: item.disabled ? 0.4 : 1,
                    }}>
                    {item.icon && (
                      <Text style={{ fontSize: 16 }}>{item.icon}</Text>
                    )}
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: '500',
                        color: item.destructive ? t.error : t.text,
                      }}>
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
