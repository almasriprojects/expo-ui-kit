import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { ArrowLeft, CheckCircle, Lock } from 'lucide-react-native';

import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { FontSize, Spacing, resolveFontFamily } from '@/constants/theme';
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
          padding: Spacing[6],
          gap: Spacing[4],
        }}
        keyboardShouldPersistTaps="handled">

        {success ? (
          <View style={{ gap: Spacing[4], alignItems: 'center' }}>
            <CheckCircle size={56} color={t.success} />
            <Text style={{
              fontSize: FontSize['2xl'].fontSize, fontWeight: '800', textAlign: 'center',
              fontFamily: resolveFontFamily(f, '700'), color: t.text,
            }}>
              Password reset!
            </Text>
            <Text style={{
              fontSize: FontSize.md.fontSize, fontFamily: resolveFontFamily(f, '400'),
              color: t.textSecondary, textAlign: 'center', lineHeight: FontSize.md.lineHeight,
            }}>
              Your password has been updated successfully. You can now sign in with your new password.
            </Text>
            <Button
              title="Back to Sign In"
              variant="primary"
              size="lg"
              onPress={onBack}
              fullWidth
              style={{ marginTop: Spacing[2] }}
            />
          </View>
        ) : (
          <>
            <View style={{ gap: Spacing[2], marginBottom: Spacing[2] }}>
              <Lock size={48} color={t.text} style={{ marginBottom: Spacing[1] }} />
              <Text style={{
                fontSize: FontSize['2xl'].fontSize, fontWeight: '800',
                fontFamily: resolveFontFamily(f, '700'), color: t.text,
              }}>
                Set new password
              </Text>
              <Text style={{
                fontSize: FontSize.md.fontSize, fontFamily: resolveFontFamily(f, '400'),
                color: t.textSecondary, lineHeight: FontSize.md.lineHeight,
              }}>
                Your new password must be at least 8 characters long and different from your previous password.
              </Text>
            </View>

            <View style={{ gap: Spacing[4] }}>
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

            <Pressable onPress={onBack} style={{ alignSelf: 'center', marginTop: Spacing[2], flexDirection: 'row', alignItems: 'center', gap: Spacing[1] }}>
              <ArrowLeft size={16} color={t.textSecondary} />
              <Text style={{
                fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.textSecondary,
                fontFamily: resolveFontFamily(f, '600'),
              }}>
                Back to Sign In
              </Text>
            </Pressable>
          </>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
