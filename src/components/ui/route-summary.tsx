import React from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { Bike, Bus, Car, Footprints, type LucideProps } from 'lucide-react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type RouteMode = 'driving' | 'walking' | 'transit' | 'cycling';

export type RouteSummaryProps = ViewProps & {
  /** Starting location name */
  origin: string;
  /** Ending location name */
  destination: string;
  /** Estimated travel duration string */
  duration: string;
  /** Total distance string */
  distance: string;
  /** Travel mode determining the icon displayed */
  mode?: RouteMode;
};

const MODE_ICONS: Record<RouteMode, React.ComponentType<LucideProps>> = {
  driving: Car,
  walking: Footprints,
  transit: Bus,
  cycling: Bike,
};

export function RouteSummary({
  origin,
  destination,
  duration,
  distance,
  mode = 'driving',
  style,
  ...props
}: RouteSummaryProps) {
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
        typeof style === 'object' ? style : undefined,
      ]}
      accessibilityRole="summary"
      accessibilityLabel={`Route from ${origin} to ${destination}, ${duration}, ${distance}`}
      {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
        <View style={{ alignItems: 'center', width: 24 }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: Radius.full,
              backgroundColor: t.success,
            }}
          />
          <View
            style={{
              width: 2,
              height: 24,
              marginVertical: 4,
              borderLeftWidth: 2,
              borderLeftColor: t.border,
              borderStyle: 'dashed',
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: Radius.full,
              backgroundColor: t.error,
            }}
          />
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Text
            style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}
            numberOfLines={1}>
            {origin}
          </Text>
          <View
            style={{
              height: 2,
              backgroundColor: 'transparent',
              marginVertical: 4,
              borderTopWidth: 2,
              borderTopColor: t.border,
              borderStyle: 'dashed',
            }}
          />
          <Text
            style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}
            numberOfLines={1}>
            {destination}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 16,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: t.border,
          gap: 16,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {React.createElement(MODE_ICONS[mode], { size: FontSize.xl.fontSize, color: t.primary })}
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>
            {duration}
          </Text>
        </View>
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary }}>•</Text>
        <Text style={{ fontSize: FontSize.md.fontSize, color: t.textSecondary }}>{distance}</Text>
      </View>
    </View>
  );
}
