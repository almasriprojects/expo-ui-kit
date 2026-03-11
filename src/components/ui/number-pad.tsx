import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';
import { Check, Delete } from 'lucide-react-native';


import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type NumberPadProps = ViewProps & {
  /** Callback invoked when a digit key is pressed */
  onKeyPress: (key: string) => void;
  /** Callback invoked when the delete key is pressed */
  onDelete?: () => void;
  /** Callback invoked when the confirm button is pressed */
  onConfirm?: () => void;
  /** Whether to show a decimal point key */
  showDecimal?: boolean;
  /** Custom label or icon for the confirm button */
  confirmLabel?: ReactNode;
};

export function NumberPad({
  onKeyPress,
  onDelete,
  onConfirm,
  showDecimal = true,
  confirmLabel,
  ...props
}: NumberPadProps) {
  const theme = useTheme();

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    [showDecimal ? '.' : '', '0', 'del'],
  ];

  const renderKey = (key: string) => {
    if (!key) return <View style={{ flex: 1, margin: 4 }} />;

    const isDel = key === 'del';

    return (
      <Pressable
        key={key}
        onPress={() => {
          if (isDel) onDelete?.();
          else onKeyPress(key);
        }}
        style={{
          flex: 1,
          margin: 4,
          height: 56,
          borderRadius: Radius.xl,
          backgroundColor: theme.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isDel ? (
          <Delete size={FontSize.xl.fontSize} color={theme.text} />
        ) : (
          <Text style={{ fontSize: FontSize['2xl'].fontSize, fontWeight: '500', color: theme.text }}>
            {key}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <View {...props}>
      {keys.map((row, i) => (
        <View key={i} style={{ flexDirection: 'row' }}>
          {row.map((key) => renderKey(key))}
        </View>
      ))}
      {onConfirm ? (
        <Pressable
          onPress={onConfirm}
          style={{
            margin: 4,
            height: 52,
            borderRadius: Radius.xl,
            backgroundColor: theme.primaryPressed,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {confirmLabel ? (
            typeof confirmLabel === 'string' ? (
              <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '600', color: theme.primaryForeground }}>{confirmLabel}</Text>
            ) : confirmLabel
          ) : (
            <Check size={20} color={theme.primaryForeground} />
          )}
        </Pressable>
      ) : null}
    </View>
  );
}
