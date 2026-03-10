import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Button } from './button';
import { RadioGroup } from './radio-group';

const DEFAULT_REASONS = [
  'I no longer need this account',
  'I want to switch to a different service',
  'Privacy concerns',
  'Too many emails/notifications',
  'Other',
];

export type DeleteAccountFlowProps = {
  onDelete: () => void;
  onCancel: () => void;
  reasons?: string[];
};

export function DeleteAccountFlow({
  onDelete,
  onCancel,
  reasons = DEFAULT_REASONS,
}: DeleteAccountFlowProps) {
  const t = useTheme();
  const [step, setStep] = useState(1);
  const [selectedReason, setSelectedReason] = useState('');
  const [confirmText, setConfirmText] = useState('');

  const canConfirm = confirmText === 'DELETE';
  const isLastStep = step === 3;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else if (canConfirm) onDelete();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onCancel();
  };

  const consequences = [
    'All your data will be permanently deleted',
    'You will lose access to all content and history',
    'This action cannot be undone',
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: t.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      accessibilityLabel="Delete account flow"
    >
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step 1: Warning */}
        {step === 1 && (
          <View accessibilityRole="none">
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: Radius.full,
                backgroundColor: t.errorSoft,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 20,
              }}
              accessibilityRole="image"
              accessibilityLabel="Warning icon"
            >
              <Text style={{ fontSize: 32 }}>⚠️</Text>
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: t.text,
                textAlign: 'center',
                marginBottom: 12,
              }}
              accessibilityRole="header"
            >
              Delete Account?
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: t.textSecondary,
                textAlign: 'center',
                marginBottom: 24,
                lineHeight: 22,
              }}
            >
              Please read the following consequences before proceeding.
            </Text>
            <View
              style={{
                backgroundColor: t.surface,
                borderRadius: Radius.lg,
                padding: 16,
                ...Shadows.sm,
              }}
            >
              {consequences.map((item, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 10,
                    marginBottom: i < consequences.length - 1 ? 12 : 0,
                  }}
                >
                  <Text style={{ fontSize: 14, color: t.error }}>•</Text>
                  <Text style={{ flex: 1, fontSize: 15, color: t.text, lineHeight: 22 }}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Step 2: Reason selector */}
        {step === 2 && (
          <View accessibilityRole="none">
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: t.text,
                marginBottom: 8,
              }}
              accessibilityRole="header"
            >
              Why are you leaving?
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: t.textSecondary,
                marginBottom: 20,
                lineHeight: 20,
              }}
            >
              Please select a reason (optional but helps us improve).
            </Text>
            <RadioGroup
              options={reasons.map((r) => ({ label: r, value: r }))}
              value={selectedReason}
              onValueChange={setSelectedReason}
              accessibilityLabel="Select reason for leaving"
            />
          </View>
        )}

        {/* Step 3: Type DELETE to confirm */}
        {step === 3 && (
          <View accessibilityRole="none">
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: t.text,
                marginBottom: 8,
              }}
              accessibilityRole="header"
            >
              Confirm deletion
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: t.textSecondary,
                marginBottom: 16,
                lineHeight: 20,
              }}
            >
              {'Type "DELETE" below to confirm you want to permanently delete your account.'}
            </Text>
            <TextInput
              value={confirmText}
              onChangeText={setConfirmText}
              placeholder="Type DELETE"
              placeholderTextColor={t.textTertiary}
              style={{
                minHeight: 48,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: Radius.lg,
                fontSize: 16,
                backgroundColor: t.surface,
                color: t.text,
                borderWidth: 1.5,
                borderColor: confirmText && !canConfirm ? t.errorBorder : t.border,
              }}
              autoCapitalize="characters"
              autoCorrect={false}
              accessibilityLabel="Type DELETE to confirm"
              accessibilityHint="Type the word DELETE to confirm account deletion"
            />
          </View>
        )}

        {/* Step indicator */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
            marginTop: 32,
          }}
          accessibilityRole="progressbar"
          accessibilityLabel={`Step ${step} of 3`}
        >
          {[1, 2, 3].map((s) => (
            <View
              key={s}
              style={{
                width: 8,
                height: 8,
                borderRadius: Radius.full,
                backgroundColor: s <= step ? t.primary : t.surfaceActive,
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          padding: 16,
          paddingBottom: Platform.OS === 'ios' ? 34 : 16,
          backgroundColor: t.background,
          borderTopWidth: 1,
          borderTopColor: t.border,
        }}
      >
        <Button
          title={step === 1 ? 'Cancel' : 'Back'}
          variant="outline"
          size="md"
          onPress={handleBack}
          style={{ flex: 1 }}
          accessibilityLabel={step === 1 ? 'Cancel' : 'Go back'}
        />
        <Button
          title={isLastStep ? 'Delete Account' : 'Continue'}
          variant="destructive"
          size="md"
          onPress={handleNext}
          style={{ flex: 1 }}
          disabled={isLastStep && !canConfirm}
          accessibilityLabel={isLastStep ? 'Delete account permanently' : 'Continue to next step'}
          accessibilityState={{ disabled: isLastStep && !canConfirm }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
