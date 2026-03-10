import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type PressableProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TransactionItemProps = PressableProps & {
  title: string;
  subtitle?: string;
  amount: number;
  currency?: string;
  symbol?: string;
  date?: string;
  icon?: ReactNode;
  status?: 'completed' | 'pending' | 'failed';
  type?: 'credit' | 'debit';
};

export function TransactionItem({
  title,
  subtitle,
  amount,
  currency,
  symbol = '$',
  date,
  icon,
  status = 'completed',
  type = 'debit',
  ...props
}: TransactionItemProps) {
  const theme = useTheme();
  const isCredit = type === 'credit';
  const amountColor = isCredit ? theme.success : theme.text;

  const statusColors = {
    completed: theme.success,
    pending: theme.warning,
    failed: theme.error,
  };

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
        gap: 12,
      }}
      {...props}>
      {icon ? (
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: Radius['2xl'],
            backgroundColor: theme.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {icon}
        </View>
      ) : (
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: Radius['2xl'],
            backgroundColor: isCredit ? theme.successSoft : theme.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 18, color: theme.text }}>{isCredit ? '↓' : '↑'}</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '500', color: theme.text }}>{title}</Text>
        {(subtitle || date) && (
          <ThemedText style={{ fontSize: 13, color: theme.textSecondary, marginTop: 2 }}>
            {subtitle ?? date}
          </ThemedText>
        )}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <ThemedText style={{ fontSize: 15, fontWeight: '600', color: amountColor }}>
          {isCredit ? '+' : '-'}{symbol}{Math.abs(amount).toFixed(2)}
        </ThemedText>
        {status !== 'completed' && (
          <ThemedText
            style={{
              fontSize: 11,
              fontWeight: '500',
              color: statusColors[status],
              marginTop: 2,
            }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </ThemedText>
        )}
      </View>
    </Pressable>
  );
}
