import React, { type ReactNode } from 'react';
import { Pressable, Text, View, type PressableProps } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TransactionItemProps = PressableProps & {
  /** Title of the transaction */
  title: string;
  /** Secondary text (e.g. merchant name) */
  subtitle?: string;
  /** Transaction amount */
  amount: number;
  /** Currency code displayed after the amount */
  currency?: string;
  /** Currency symbol displayed before the amount */
  symbol?: string;
  /** Formatted date string of the transaction */
  date?: string;
  /** Custom icon element rendered on the left */
  icon?: ReactNode;
  /** Current status of the transaction */
  status?: 'completed' | 'pending' | 'failed';
  /** Whether the transaction is a credit or debit */
  type?: 'credit' | 'debit';
};

function TransactionItemBase({
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
          {isCredit ? (
            <ArrowDown size={18} color={theme.success} />
          ) : (
            <ArrowUp size={18} color={theme.text} />
          )}
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '500', color: theme.text }}>{title}</Text>
        {(subtitle || date) && (
          <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: theme.textSecondary, marginTop: 2 }}>
            {subtitle ?? date}
          </ThemedText>
        )}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: amountColor }}>
          {isCredit ? '+' : '-'}{symbol}{Math.abs(amount).toFixed(2)}
        </ThemedText>
        {status !== 'completed' && (
          <ThemedText
            style={{
              fontSize: FontSize.xs.fontSize,
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

export const TransactionItem = React.memo(TransactionItemBase);
