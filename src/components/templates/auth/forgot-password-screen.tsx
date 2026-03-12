import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FontSize, Spacing, resolveFontFamily } from '@/constants/theme';
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
          padding: Spacing[6],
          gap: Spacing[4],
        }}
        keyboardShouldPersistTaps="handled">

        <View style={{ gap: Spacing[2], marginBottom: Spacing[2] }}>
          <Text style={{ fontSize: FontSize['4xl'].fontSize, marginBottom: Spacing[1] }}>🔑</Text>
          <Text style={{
            fontSize: FontSize['2xl'].fontSize, fontWeight: '800',
            fontFamily: resolveFontFamily(f, '700'), color: t.text,
          }}>
            Forgot password?
          </Text>
          <Text style={{
            fontSize: FontSize.md.fontSize, fontFamily: resolveFontFamily(f, '400'),
            color: t.textSecondary, lineHeight: FontSize.md.lineHeight,
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
                fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.primary,
                fontFamily: resolveFontFamily(f, '600'), textAlign: 'center',
              }}>
                {"Didn't receive it? Resend"}
              </Text>
            </Pressable>
          </>
        )}

        <Pressable onPress={onBack} style={{ alignSelf: 'center', marginTop: Spacing[2], flexDirection: 'row', alignItems: 'center', gap: Spacing[1] }}>
          <ArrowLeft size={16} color={t.textSecondary} />
          <Text style={{
            fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.textSecondary,
            fontFamily: resolveFontFamily(f, '600'),
          }}>
            Back to Sign In
          </Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
