import React from 'react';
import { ActivityIndicator, Text, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type ReadReceiptStatus = 'sending' | 'sent' | 'delivered' | 'read';

export type ReadReceiptProps = {
  status: ReadReceiptStatus;
  size?: number;
  style?: ViewStyle;
};

export function ReadReceipt({ status, size = 14, style }: ReadReceiptProps) {
  const t = useTheme();

  if (status === 'sending') {
    return (
      <View
        style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}
        accessibilityLabel="Sending"
        accessibilityRole="progressbar">
        <ActivityIndicator size={size - 2} color={t.textSecondary} />
      </View>
    );
  }

  const isRead = status === 'read';
  const isDelivered = status === 'delivered' || isRead;
  const checkColor = isRead ? t.readReceipt : t.textSecondary;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: -1,
        },
        style,
      ]}
      accessibilityLabel={
        status === 'sent'
          ? 'Sent'
          : status === 'delivered'
            ? 'Delivered'
            : 'Read'
      }>
      <Text style={{ fontSize: size, color: checkColor }}>✓</Text>
      {isDelivered && (
        <Text style={{ fontSize: size, color: checkColor, marginLeft: -2 }}>
          ✓
        </Text>
      )}
    </View>
  );
}
