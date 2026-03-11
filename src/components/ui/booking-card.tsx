import React from 'react';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';

import { Calendar, Clock, MapPin } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, type ThemeTokens, FontSize } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BookingCardProps = Omit<PressableProps, 'style'> & {
  /** Custom styles for the card container */
  style?: ViewStyle;
  /** Name or description of the booking */
  title: string;
  /** Formatted date string */
  date: string;
  /** Formatted time string */
  time: string;
  /** Venue or address of the booking */
  location?: string;
  /** Current booking status */
  status?: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  /** Formatted price string */
  price?: string;
  /** Booking reference or confirmation number */
  reference?: string;
  /** Emoji or character icon for the booking */
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
          <ThemedText style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: s.text }}>
            {s.label}
          </ThemedText>
        </View>
        {reference && (
          <ThemedText style={{ fontSize: FontSize.xs.fontSize, color: t.textSecondary }}>
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
              <Text style={{ fontSize: FontSize.xl.fontSize, color: t.text }}>{icon}</Text>
            </View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', marginBottom: 4, color: t.text }}>
              {title}
            </Text>
            <View style={{ gap: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Calendar size={FontSize.sm.fontSize} color={t.textSecondary} />
                <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{date}</ThemedText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Clock size={FontSize.sm.fontSize} color={t.textSecondary} />
                <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{time}</ThemedText>
              </View>
              {location && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <MapPin size={FontSize.sm.fontSize} color={t.textSecondary} />
                  <ThemedText style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>{location}</ThemedText>
                </View>
              )}
            </View>
          </View>
          {price && (
            <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.text }}>{price}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}
