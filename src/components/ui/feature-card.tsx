import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  iconBg?: string;
  style?: ViewStyle;
};

export function FeatureCard({
  title,
  description,
  icon,
  iconBg,
  style,
}: FeatureCardProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: Radius.xl,
          backgroundColor: iconBg ?? t.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
        }}>
        <Text style={{ fontSize: 22 }}>{icon}</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '700', color: t.text, marginBottom: 6 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 13, color: t.textSecondary, lineHeight: 19 }}>
        {description}
      </Text>
    </View>
  );
}
