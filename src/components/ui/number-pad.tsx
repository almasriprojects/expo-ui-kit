import React from 'react';
import { Pressable, Text, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type NumberPadProps = ViewProps & {
  onKeyPress: (key: string) => void;
  onDelete?: () => void;
  onConfirm?: () => void;
  showDecimal?: boolean;
  confirmLabel?: string;
};

export function NumberPad({
  onKeyPress,
  onDelete,
  onConfirm,
  showDecimal = true,
  confirmLabel = '✓',
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
        <Text style={{ fontSize: isDel ? 18 : 22, fontWeight: '500', color: theme.text }}>
          {isDel ? '⌫' : key}
        </Text>
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
      {onConfirm && (
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
          <ThemedText style={{ color: theme.primaryForeground, fontSize: 16, fontWeight: '600' }}>
            {confirmLabel}
          </ThemedText>
        </Pressable>
      )}
    </View>
  );
}
