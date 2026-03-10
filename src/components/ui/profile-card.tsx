import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Avatar } from './avatar';
import { StatusIndicator } from './status-indicator';

type ProfileCardProps = {
  name: string;
  subtitle?: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  stats?: { label: string; value: string }[];
  onPress?: () => void;
  action?: { label: string; onPress: () => void };
  style?: ViewStyle;
};

export function ProfileCard({
  name,
  subtitle,
  avatar,
  status,
  stats,
  onPress,
  action,
  style,
}: ProfileCardProps) {
  const t = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View style={{ position: 'relative', marginBottom: 12 }}>
        <Avatar source={avatar} initials={name[0]} size="lg" />
        {status && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              borderWidth: 2,
              borderColor: t.card,
              borderRadius: Radius.full,
            }}>
            <StatusIndicator status={status} size="sm" />
          </View>
        )}
      </View>

      <Text style={{ fontSize: 18, fontWeight: '700', color: t.text }}>{name}</Text>
      {subtitle && (
        <Text style={{ fontSize: 14, color: t.textSecondary, marginTop: 2 }}>{subtitle}</Text>
      )}

      {stats && stats.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: t.border,
            gap: 24,
          }}>
          {stats.map((stat, i) => (
            <View key={i} style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: t.text }}>{stat.value}</Text>
              <Text style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>{stat.label}</Text>
            </View>
          ))}
        </View>
      )}

      {action && (
        <Pressable
          onPress={action.onPress}
          style={{
            marginTop: 16,
            paddingHorizontal: 24,
            paddingVertical: 10,
            borderRadius: Radius.full,
            backgroundColor: t.primary,
          }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: t.primaryForeground }}>
            {action.label}
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
}
