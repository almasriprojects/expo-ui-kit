import React from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import { Check } from 'lucide-react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CheckboxProps = ViewProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  disabled = false,
  ...props
}: CheckboxProps) {
  const t = useTheme();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked, disabled }}
      onPress={() => !disabled && onCheckedChange(!checked)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        opacity: disabled ? 0.5 : 1,
      }}
      {...props}>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: Radius.sm,
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: checked ? t.primary : 'transparent',
          borderColor: checked ? t.primary : t.borderStrong,
        }}>
        {checked && (
          <Check size={14} color={t.primaryForeground} strokeWidth={3} />
        )}
      </View>
      {label && (
        <Text style={{ fontSize: 15, fontWeight: '500', color: t.text }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
