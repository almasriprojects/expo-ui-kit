import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type StepIndicatorProps = ViewProps & {
  steps: string[];
  currentStep: number;
};

export function StepIndicator({
  steps,
  currentStep,
  ...props
}: StepIndicatorProps) {
  const theme = useTheme();

  return (
    <View {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          const isUpcoming = i > currentStep;

          return (
            <React.Fragment key={i}>
              {/* Step circle */}
              <View style={{ alignItems: 'center', flex: 0 }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isCompleted
                      ? theme.success
                      : isCurrent
                        ? theme.primaryPressed
                        : theme.card,
                    borderWidth: isUpcoming ? 2 : 0,
                    borderColor: theme.cardPressed,
                  }}>
                  <ThemedText
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: isCompleted || isCurrent ? theme.primaryForeground : theme.textSecondary,
                    }}>
                    {isCompleted ? '✓' : i + 1}
                  </ThemedText>
                </View>
              </View>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: isCompleted ? theme.success : theme.cardPressed,
                    marginHorizontal: 4,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
      {/* Labels */}
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {steps.map((step, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center' }}>
            <ThemedText
              style={{
                fontSize: 11,
                fontWeight: i <= currentStep ? '600' : '400',
                color: i <= currentStep ? theme.text : theme.textSecondary,
                textAlign: 'center',
              }}>
              {step}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}
