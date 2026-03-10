import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { Spacing, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';

type ResetPasswordScreenProps = {
  onReset?: (password: string) => void;
  onBack?: () => void;
  loading?: boolean;
};

export function ResetPasswordScreen({
  onReset,
  onBack,
  loading = false,
}: ResetPasswordScreenProps) {
  const t = useTheme();
  const f = useFont();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [success, setSuccess] = useState(false);

  function validate() {
    const e: typeof errors = {};
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Minimum 8 characters';
    if (password !== confirmPassword) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      setSuccess(true);
      onReset?.(password);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: t.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: Spacing.four,
          gap: Spacing.three,
        }}
        keyboardShouldPersistTaps="handled">

        {success ? (
          <View style={{ gap: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 56 }}>✅</Text>
            <Text style={{
              fontSize: 26, fontWeight: '800', textAlign: 'center',
              fontFamily: resolveFontFamily(f, '700'), color: t.text,
            }}>
              Password reset!
            </Text>
            <Text style={{
              fontSize: 15, fontFamily: resolveFontFamily(f, '400'),
              color: t.textSecondary, textAlign: 'center', lineHeight: 22,
            }}>
              Your password has been updated successfully. You can now sign in with your new password.
            </Text>
            <Button
              title="Back to Sign In"
              variant="primary"
              size="lg"
              onPress={onBack}
              fullWidth
              style={{ marginTop: 8 }}
            />
          </View>
        ) : (
          <>
            <View style={{ gap: 8, marginBottom: 8 }}>
              <Text style={{ fontSize: 48, marginBottom: 4 }}>🔒</Text>
              <Text style={{
                fontSize: 28, fontWeight: '800',
                fontFamily: resolveFontFamily(f, '700'), color: t.text,
              }}>
                Set new password
              </Text>
              <Text style={{
                fontSize: 15, fontFamily: resolveFontFamily(f, '400'),
                color: t.textSecondary, lineHeight: 22,
              }}>
                Your new password must be at least 8 characters long and different from your previous password.
              </Text>
            </View>

            <View style={{ gap: 16 }}>
              <PasswordInput
                label="New Password"
                placeholder="Min. 8 characters"
                value={password}
                onChangeText={setPassword}
                error={errors.password}
                autoComplete="new-password"
                textContentType="newPassword"
              />

              <PasswordInput
                label="Confirm New Password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={errors.confirm}
                autoComplete="new-password"
                textContentType="newPassword"
              />
            </View>

            <Button
              title={loading ? 'Resetting...' : 'Reset Password'}
              variant="primary"
              size="lg"
              loading={loading}
              onPress={handleSubmit}
              fullWidth
            />

            <Pressable onPress={onBack} style={{ alignSelf: 'center', marginTop: 8 }}>
              <Text style={{
                fontSize: 14, fontWeight: '600', color: t.textSecondary,
                fontFamily: resolveFontFamily(f, '600'),
              }}>
                ← Back to Sign In
              </Text>
            </Pressable>
          </>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
