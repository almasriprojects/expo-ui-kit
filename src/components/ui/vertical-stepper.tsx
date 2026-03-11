import React from 'react';
import { View } from 'react-native';
import { Check } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { FontSize, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type VerticalStep = {
  /** Title text for the step */
  title: string;
  /** Optional description text for the step */
  description?: string;
  /** Custom content rendered below the step title */
  content?: React.ReactNode;
  /** Status of the step */
  status?: 'completed' | 'current' | 'upcoming';
};

export type VerticalStepperProps = {
  /** Array of step definitions */
  steps: VerticalStep[];
  /** Zero-based index of the current step */
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
                  <Check size={14} color={t.primaryForeground} strokeWidth={3} />
                ) : isCurrent ? (
                  <ThemedText style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: t.primaryForeground }}>
                    {index + 1}
                  </ThemedText>
                ) : (
                  <ThemedText style={{ fontSize: FontSize.xs.fontSize, fontWeight: '600', color: t.textSecondary }}>
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
                  fontSize: FontSize.lg.fontSize,
                  fontWeight: isCurrent ? '600' : '500',
                  color: isUpcoming ? t.textSecondary : t.text,
                }}>
                {step.title}
              </ThemedText>
              {step.description && (
                <ThemedText
                  style={{
                    fontSize: FontSize.md.fontSize,
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
