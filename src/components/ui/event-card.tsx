import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type EventCardProps = {
  title: string;
  description?: string;
  date: string;
  time: string;
  location?: string;
  attendees?: number;
  color?: string;
  onPress?: () => void;
  onRSVP?: () => void;
  rsvpStatus?: 'going' | 'maybe' | 'none';
  style?: ViewStyle;
};

export function EventCard({
  title,
  description,
  date,
  time,
  location,
  attendees,
  color,
  onPress,
  onRSVP,
  rsvpStatus = 'none',
  style,
}: EventCardProps) {
  const t = useTheme();
  const accentColor = color ?? t.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View style={{ height: 4, backgroundColor: accentColor }} />
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <View
            style={{
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: accentColor + '12',
              borderRadius: Radius.lg,
              paddingVertical: 8,
            }}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: accentColor, textTransform: 'uppercase' }}>
              {date.split(' ')[0]}
            </Text>
            <Text style={{ fontSize: 22, fontWeight: '800', color: accentColor }}>
              {date.split(' ')[1] ?? date}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: t.text }}>{title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <Text style={{ fontSize: 13, color: t.textSecondary }}>🕐 {time}</Text>
            </View>
            {location && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <Text style={{ fontSize: 13, color: t.textSecondary }}>📍 {location}</Text>
              </View>
            )}
          </View>
        </View>
        {description && (
          <Text style={{ fontSize: 13, color: t.textSecondary, marginTop: 10, lineHeight: 19 }}>
            {description}
          </Text>
        )}
        {(attendees != null || onRSVP) && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 14,
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: t.border,
            }}>
            {attendees != null && (
              <Text style={{ fontSize: 13, color: t.textSecondary }}>
                👥 {attendees} attending
              </Text>
            )}
            {onRSVP && (
              <Pressable
                onPress={onRSVP}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  borderRadius: Radius.full,
                  backgroundColor: rsvpStatus === 'going' ? t.success : accentColor,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  {rsvpStatus === 'going' && <Check size={13} color={t.textOnColor} />}
                  <Text style={{ fontSize: 13, fontWeight: '600', color: t.textOnColor }}>
                    {rsvpStatus === 'going' ? 'Going' : rsvpStatus === 'maybe' ? 'Maybe' : 'RSVP'}
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
}
