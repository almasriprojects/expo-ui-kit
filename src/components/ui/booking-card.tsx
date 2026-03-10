import React from 'react';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, type ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BookingCardProps = Omit<PressableProps, 'style'> & {
  style?: ViewStyle;
  title: string;
  date: string;
  time: string;
  location?: string;
  status?: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  price?: string;
  reference?: string;
  icon?: string;
};

function getStatusConfig(t: ThemeTokens) {
  return {
    confirmed: { bg: t.successSoft, text: t.success, label: 'Confirmed' },
    pending: { bg: t.warningSoft, text: t.warning, label: 'Pending' },
    cancelled: { bg: t.errorSoft, text: t.error, label: 'Cancelled' },
    completed: { bg: t.surface, text: t.textSecondary, label: 'Completed' },
  };
}

export function BookingCard({
  title,
  date,
  time,
  location,
  status = 'confirmed',
  price,
  reference,
  icon,
  style,
  ...props
}: BookingCardProps) {
  const t = useTheme();
  const s = getStatusConfig(t)[status];

  return (
    <Pressable
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          overflow: 'hidden',
        },
        style,
      ]}
      {...props}>
      <View
        style={{
          backgroundColor: s.bg,
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 8, height: 8, borderRadius: Radius.full, backgroundColor: s.text }} />
          <ThemedText style={{ fontSize: 12, fontWeight: '600', color: s.text }}>
            {s.label}
          </ThemedText>
        </View>
        {reference && (
          <ThemedText style={{ fontSize: 11, color: t.textSecondary }}>
            #{reference}
          </ThemedText>
        )}
      </View>

      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
          {icon && (
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: Radius.lg,
                backgroundColor: t.cardPressed,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 20, color: t.text }}>{icon}</Text>
            </View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 4, color: t.text }}>
              {title}
            </Text>
            <View style={{ gap: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <ThemedText style={{ fontSize: 12, color: t.textSecondary }}>📅</ThemedText>
                <ThemedText style={{ fontSize: 13, color: t.textSecondary }}>{date}</ThemedText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <ThemedText style={{ fontSize: 12, color: t.textSecondary }}>🕐</ThemedText>
                <ThemedText style={{ fontSize: 13, color: t.textSecondary }}>{time}</ThemedText>
              </View>
              {location && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <ThemedText style={{ fontSize: 12, color: t.textSecondary }}>📍</ThemedText>
                  <ThemedText style={{ fontSize: 13, color: t.textSecondary }}>{location}</ThemedText>
                </View>
              )}
            </View>
          </View>
          {price && (
            <Text style={{ fontSize: 16, fontWeight: '700', color: t.text }}>{price}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}
