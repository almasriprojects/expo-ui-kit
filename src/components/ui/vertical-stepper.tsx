import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type VerticalStep = {
  title: string;
  description?: string;
  content?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
};

export type VerticalStepperProps = {
  steps: VerticalStep[];
  currentStep?: number;
};

export function VerticalStepper({ steps, currentStep = 0 }: VerticalStepperProps) {
  const t = useTheme();

  return (
    <View>
      {steps.map((step, index) => {
        const status =
          step.status ?? (index < currentStep ? 'completed' : index === currentStep ? 'current' : 'upcoming');
        const isCompleted = status === 'completed';
        const isCurrent = status === 'current';
        const isUpcoming = status === 'upcoming';

        return (
          <View key={index} style={{ flexDirection: 'row' }}>
            {/* Left column: circle + line */}
            <View style={{ alignItems: 'center', width: 32 }}>
              {/* Connecting line from previous step */}
              {index > 0 && (
                <View
                  style={{
                    width: 2,
                    height: 12,
                    backgroundColor: index <= currentStep ? t.primary : t.border,
                  }}
                />
              )}
              {/* Step circle */}
              <View
                style={{
                  width: isCurrent ? 32 : 24,
                  height: isCurrent ? 32 : 24,
                  borderRadius: Radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isUpcoming ? 'transparent' : t.primary,
                  borderWidth: isUpcoming ? 2 : 0,
                  borderColor: t.border,
                }}>
                {isCompleted ? (
                  <ThemedText style={{ fontSize: 12, fontWeight: '700', color: t.primaryForeground }}>
                    ✓
                  </ThemedText>
                ) : isCurrent ? (
                  <ThemedText style={{ fontSize: 14, fontWeight: '700', color: t.primaryForeground }}>
                    {index + 1}
                  </ThemedText>
                ) : (
                  <ThemedText style={{ fontSize: 11, fontWeight: '600', color: t.textSecondary }}>
                    {index + 1}
                  </ThemedText>
                )}
              </View>
              {/* Connecting line to next step */}
              {index < steps.length - 1 && (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 24,
                    backgroundColor: index < currentStep ? t.primary : t.border,
                  }}
                />
              )}
            </View>

            {/* Right column: title, description, content */}
            <View style={{ flex: 1, marginLeft: 12, paddingBottom: 24 }}>
              <ThemedText
                style={{
                  fontSize: 16,
                  fontWeight: isCurrent ? '600' : '500',
                  color: isUpcoming ? t.textSecondary : t.text,
                }}>
                {step.title}
              </ThemedText>
              {step.description && (
                <ThemedText
                  style={{
                    fontSize: 14,
                    color: t.textSecondary,
                    marginTop: 2,
                  }}>
                  {step.description}
                </ThemedText>
              )}
              {isCurrent && step.content && <View style={{ marginTop: 12 }}>{step.content}</View>}
            </View>
          </View>
        );
      })}
    </View>
  );
}
