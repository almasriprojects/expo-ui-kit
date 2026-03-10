import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

import { Button } from '@/components/ui/button';
import { OTPInput } from '@/components/ui/otp-input';
import { Spacing, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';

type OTPScreenProps = {
  email?: string;
  phone?: string;
  length?: number;
  onVerify?: (code: string) => void;
  onResend?: () => void;
  onBack?: () => void;
  loading?: boolean;
};

export function OTPScreen({
  email,
  phone,
  length = 6,
  onVerify,
  onResend,
  onBack,
  loading = false,
}: OTPScreenProps) {
  const t = useTheme();
  const f = useFont();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current != null) clearInterval(intervalRef.current);
    };
  }, []);

  const destination = email || phone || 'your email';

  function handleVerify() {
    if (code.length < length) {
      setError(`Enter all ${length} digits`);
      return;
    }
    setError('');
    onVerify?.(code);
  }

  function handleResend() {
    if (resendCooldown > 0) return;
    if (intervalRef.current != null) clearInterval(intervalRef.current);
    onResend?.();
    setResendCooldown(30);
    intervalRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current != null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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
          gap: Spacing.four,
        }}
        keyboardShouldPersistTaps="handled">

        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text style={{ fontSize: 48, marginBottom: 4 }}>📨</Text>
          <Text style={{
            fontSize: 28, fontWeight: '800', textAlign: 'center',
            fontFamily: resolveFontFamily(f, '700'), color: t.text,
          }}>
            Verify your {email ? 'email' : 'phone'}
          </Text>
          <Text style={{
            fontSize: 15, fontFamily: resolveFontFamily(f, '400'),
            color: t.textSecondary, textAlign: 'center', lineHeight: 22,
          }}>
            We sent a {length}-digit code to{'\n'}
            <Text style={{ fontWeight: '600', color: t.text }}>{destination}</Text>
          </Text>
        </View>

        <OTPInput
          length={length}
          value={code}
          onValueChange={(v) => { setCode(v); setError(''); }}
          error={error}
        />

        <Button
          title={loading ? 'Verifying...' : 'Verify'}
          variant="primary"
          size="lg"
          loading={loading}
          onPress={handleVerify}
          fullWidth
        />

        <View style={{ alignItems: 'center', gap: 16 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontSize: 14, color: t.textSecondary, fontFamily: resolveFontFamily(f, '400') }}>
              {"Didn't receive the code?"}
            </Text>
            <Pressable onPress={handleResend} disabled={resendCooldown > 0}>
              <Text style={{
                fontSize: 14, fontWeight: '700',
                color: resendCooldown > 0 ? t.textTertiary : t.primary,
                fontFamily: resolveFontFamily(f, '700'),
              }}>
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}
              </Text>
            </Pressable>
          </View>

          <Pressable onPress={onBack} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <ArrowLeft size={16} color={t.textSecondary} />
            <Text style={{
              fontSize: 14, fontWeight: '600', color: t.textSecondary,
              fontFamily: resolveFontFamily(f, '600'),
            }}>
              Back
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
