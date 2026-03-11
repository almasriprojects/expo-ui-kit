import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { SocialButton } from '@/components/ui/social-button';
import { Divider } from '@/components/ui/divider';
import { Spacing, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';

type SignInScreenProps = {
  onSignIn?: (email: string, password: string) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onSocialLogin?: (provider: 'google' | 'apple' | 'facebook') => void;
  loading?: boolean;
};

export function SignInScreen({
  onSignIn,
  onForgotPassword,
  onSignUp,
  onSocialLogin,
  loading = false,
}: SignInScreenProps) {
  const t = useTheme();
  const f = useFont();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (validate()) onSignIn?.(email, password);
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

        <View style={{ gap: 8, marginBottom: 8 }}>
          <Text style={{
            fontSize: 30, fontWeight: '800',
            fontFamily: resolveFontFamily(f, '700'), color: t.text,
          }}>
            Welcome back
          </Text>
          <Text style={{
            fontSize: 15, fontFamily: resolveFontFamily(f, '400'),
            color: t.textSecondary,
          }}>
            Sign in to your account to continue
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />

          <View style={{ gap: 6 }}>
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              autoComplete="password"
              textContentType="password"
            />
            <Pressable onPress={onForgotPassword} style={{ alignSelf: 'flex-end' }}>
              <Text style={{
                fontSize: 13, fontWeight: '600', color: t.primary,
                fontFamily: resolveFontFamily(f, '600'),
              }}>
                Forgot password?
              </Text>
            </Pressable>
          </View>
        </View>

        <Button
          title={loading ? 'Signing in...' : 'Sign In'}
          variant="primary"
          size="lg"
          loading={loading}
          onPress={handleSubmit}
          fullWidth
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Divider style={{ flex: 1 }} />
          <Text style={{ fontSize: 13, color: t.textTertiary, fontFamily: resolveFontFamily(f, '400') }}>
            or continue with
          </Text>
          <Divider style={{ flex: 1 }} />
        </View>

        <View style={{ gap: 12 }}>
          <SocialButton provider="google" onPress={() => onSocialLogin?.('google')} />
          <SocialButton provider="apple" onPress={() => onSocialLogin?.('apple')} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 8 }}>
          <Text style={{ fontSize: 14, color: t.textSecondary, fontFamily: resolveFontFamily(f, '400') }}>
            {"Don't have an account?"}
          </Text>
          <Pressable onPress={onSignUp}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: t.primary, fontFamily: resolveFontFamily(f, '700') }}>
              Sign Up
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
