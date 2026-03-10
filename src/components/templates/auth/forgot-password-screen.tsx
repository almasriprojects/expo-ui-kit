import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spacing, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';

type ForgotPasswordScreenProps = {
  onSubmit?: (email: string) => void;
  onBack?: () => void;
  loading?: boolean;
};

export function ForgotPasswordScreen({
  onSubmit,
  onBack,
  loading = false,
}: ForgotPasswordScreenProps) {
  const t = useTheme();
  const f = useFont();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email');
      return;
    }
    setError('');
    setSent(true);
    onSubmit?.(email);
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

        <View style={{ gap: 8, marginBottom: 8 }}>
          <Text style={{ fontSize: 48, marginBottom: 4 }}>🔑</Text>
          <Text style={{
            fontSize: 28, fontWeight: '800',
            fontFamily: resolveFontFamily(f, '700'), color: t.text,
          }}>
            Forgot password?
          </Text>
          <Text style={{
            fontSize: 15, fontFamily: resolveFontFamily(f, '400'),
            color: t.textSecondary, lineHeight: 22,
          }}>
            {sent
              ? `We've sent a reset link to ${email}. Check your inbox and follow the instructions.`
              : "No worries. Enter your email and we'll send you a link to reset your password."}
          </Text>
        </View>

        {!sent ? (
          <>
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={(v) => { setEmail(v); setError(''); }}
              error={error}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />

            <Button
              title={loading ? 'Sending...' : 'Send Reset Link'}
              variant="primary"
              size="lg"
              loading={loading}
              onPress={handleSubmit}
              fullWidth
            />
          </>
        ) : (
          <>
            <Button
              title="Open Email App"
              variant="primary"
              size="lg"
              onPress={() => {}}
              fullWidth
            />

            <Pressable onPress={handleSubmit}>
              <Text style={{
                fontSize: 14, fontWeight: '600', color: t.primary,
                fontFamily: resolveFontFamily(f, '600'), textAlign: 'center',
              }}>
                {"Didn't receive it? Resend"}
              </Text>
            </Pressable>
          </>
        )}

        <Pressable onPress={onBack} style={{ alignSelf: 'center', marginTop: 8 }}>
          <Text style={{
            fontSize: 14, fontWeight: '600', color: t.textSecondary,
            fontFamily: resolveFontFamily(f, '600'),
          }}>
            ← Back to Sign In
          </Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
