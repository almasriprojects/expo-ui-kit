import React, { useState } from 'react';
import { View, type ViewProps } from 'react-native';

import { Button } from './button';
import { StepIndicator } from './step-indicator';

export type MultiStepFormStep = {
  title: string;
  content: React.ReactNode;
};

export type MultiStepFormProps = ViewProps & {
  steps: MultiStepFormStep[];
  onComplete?: () => void;
  submitLabel?: string;
};

export function MultiStepForm({
  steps,
  onComplete,
  submitLabel = 'Submit',
  style,
  ...props
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  const handleBack = () => {
    if (isFirst) return;
    setCurrentStep((s) => s - 1);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete?.();
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  if (steps.length === 0) return null;

  const stepTitles = steps.map((s) => s.title);
  const currentContent = steps[currentStep].content;

  return (
    <View style={[{ gap: 24 }, style]} {...props}>
      <StepIndicator
        steps={stepTitles}
        currentStep={currentStep}
      />
      <View style={{ minHeight: 120 }}>{currentContent}</View>
      <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'flex-end' }}>
        {!isFirst && (
          <Button
            title="Back"
            variant="outline"
            onPress={handleBack}
            accessibilityLabel="Go to previous step"
          />
        )}
        <Button
          title={isLast ? submitLabel : 'Next'}
          variant="primary"
          onPress={handleNext}
          accessibilityLabel={isLast ? 'Submit form' : 'Go to next step'}
        />
      </View>
    </View>
  );
}
