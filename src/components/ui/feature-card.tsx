import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FeatureCardProps = {
  /** Feature title text */
  title: string;
  /** Feature description text */
  description: string;
  /** Emoji or text icon displayed in the card */
  icon: string;
  /** Background color for the icon container */
  iconBg?: string;
  /** Custom styles applied to the card container */
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
        <Text style={{ fontSize: FontSize['2xl'].fontSize }}>{icon}</Text>
      </View>
      <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.text, marginBottom: 6 }}>
        {title}
      </Text>
      <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary, lineHeight: 19 }}>
        {description}
      </Text>
    </View>
  );
}
