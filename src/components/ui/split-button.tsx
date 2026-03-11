import React, { useState } from 'react';
import { Modal, Pressable, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SplitButtonOption = {
  /** Display label for the dropdown option */
  label: string;
  /** Callback invoked when the option is selected */
  onPress: () => void;
};

export type SplitButtonProps = {
  /** Label for the primary button action */
  title: string;
  /** Callback invoked when the primary button is pressed */
  onPress: () => void;
  /** Dropdown options displayed when the chevron is pressed */
  options: SplitButtonOption[];
  /** Visual style variant of the button */
  variant?: 'primary' | 'outline';
  /** Custom styles applied to the button container */
  style?: ViewStyle;
};

export function SplitButton({
  title,
  onPress,
  options,
  variant = 'primary',
  style,
}: SplitButtonProps) {
  const t = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const isPrimary = variant === 'primary';

  const mainBg = isPrimary ? t.primary : 'transparent';
  const mainText = isPrimary ? t.primaryForeground : t.primary;
  const borderStyle = isPrimary ? {} : { borderWidth: 1.5, borderColor: t.primary };

  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      <Pressable
        onPress={onPress}
        style={{
          flex: 1,
          backgroundColor: mainBg,
          paddingVertical: 12,
          paddingHorizontal: 18,
          borderTopLeftRadius: Radius.lg,
          borderBottomLeftRadius: Radius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          ...borderStyle,
          borderRightWidth: 0,
        }}>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: mainText }}>{title}</Text>
      </Pressable>
      <View style={{ width: 1, backgroundColor: isPrimary ? t.primaryPressed : t.primary, opacity: 0.3 }} />
      <Pressable
        onPress={() => setMenuOpen(true)}
        style={{
          backgroundColor: mainBg,
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderTopRightRadius: Radius.lg,
          borderBottomRightRadius: Radius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          ...borderStyle,
          borderLeftWidth: 0,
        }}>
        <Text style={{ fontSize: FontSize.sm.fontSize, color: mainText }}>▾</Text>
      </Pressable>

      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <Pressable
          onPress={() => setMenuOpen(false)}
          style={{ flex: 1, backgroundColor: t.overlayDarkSubtle, justifyContent: 'center', paddingHorizontal: 40 }}>
          <View
            style={{
              backgroundColor: t.card,
              borderRadius: Radius.xl,
              overflow: 'hidden',
              ...Shadows.lg,
            }}>
            {options.map((opt, i) => (
              <Pressable
                key={i}
                onPress={() => {
                  setMenuOpen(false);
                  opt.onPress();
                }}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 18,
                  borderBottomWidth: i < options.length - 1 ? 1 : 0,
                  borderBottomColor: t.border,
                }}>
                <Text style={{ fontSize: FontSize.md.fontSize, color: t.text }}>{opt.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
