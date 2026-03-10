import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { Fonts, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ShippingStep = {
  title: string;
  description?: string;
  time?: string;
  completed: boolean;
  current?: boolean;
};

type ShippingTrackerProps = {
  steps: ShippingStep[];
  trackingNumber?: string;
  estimatedDelivery?: string;
  style?: ViewStyle;
};

export function ShippingTracker({
  steps,
  trackingNumber,
  estimatedDelivery,
  style,
}: ShippingTrackerProps) {
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
      {(trackingNumber || estimatedDelivery) && (
        <View style={{ marginBottom: 20 }}>
          {trackingNumber && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontSize: 12, color: t.textSecondary }}>Tracking</Text>
              <Text style={{ fontSize: 12, fontWeight: '600', color: t.primary, fontFamily: Fonts?.mono ?? 'monospace' }}>
                {trackingNumber}
              </Text>
            </View>
          )}
          {estimatedDelivery && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 12, color: t.textSecondary }}>Est. Delivery</Text>
              <Text style={{ fontSize: 12, fontWeight: '600', color: t.text }}>
                {estimatedDelivery}
              </Text>
            </View>
          )}
        </View>
      )}

      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const dotColor = step.completed ? t.success : step.current ? t.primary : t.surfaceActive;
        const lineColor = step.completed ? t.success : t.surface;

        return (
          <View key={i} style={{ flexDirection: 'row', gap: 14 }}>
            <View style={{ alignItems: 'center', width: 20 }}>
              <View
                style={{
                  width: step.current ? 18 : 14,
                  height: step.current ? 18 : 14,
                  borderRadius: Radius.full,
                  backgroundColor: dotColor,
                  borderWidth: step.current ? 3 : 0,
                  borderColor: step.current ? t.primarySoft : undefined,
                }}
              />
              {!isLast && (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 30,
                    backgroundColor: lineColor,
                    marginVertical: 4,
                  }}
                />
              )}
            </View>
            <View style={{ flex: 1, paddingBottom: isLast ? 0 : 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: step.current || step.completed ? '600' : '400',
                    color: step.current || step.completed ? t.text : t.textTertiary,
                  }}>
                  {step.title}
                </Text>
                {step.time && (
                  <Text style={{ fontSize: 11, color: t.textTertiary }}>{step.time}</Text>
                )}
              </View>
              {step.description && (
                <Text style={{ fontSize: 12, color: t.textSecondary, marginTop: 2, lineHeight: 17 }}>
                  {step.description}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
