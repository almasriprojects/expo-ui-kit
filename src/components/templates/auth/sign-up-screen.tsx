import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { SocialButton } from '@/components/ui/social-button';
import { Divider } from '@/components/ui/divider';
import { Spacing, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';

type SignUpScreenProps = {
  onSignUp?: (data: { name: string; email: string; password: string }) => void;
  onSignIn?: () => void;
  onSocialLogin?: (provider: 'google' | 'apple' | 'facebook') => void;
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
  loading?: boolean;
};

export function SignUpScreen({
  onSignUp,
  onSignIn,
  onSocialLogin,
  onTermsPress,
  onPrivacyPress,
  loading = false,
}: SignUpScreenProps) {
  const t = useTheme();
  const f = useFont();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Minimum 8 characters';
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!agreed) e.agreed = 'You must accept the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (validate()) onSignUp?.({ name, email, password });
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
            Create account
          </Text>
          <Text style={{
            fontSize: 15, fontFamily: resolveFontFamily(f, '400'),
            color: t.textSecondary,
          }}>
            Sign up to get started
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            error={errors.name}
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
          />

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

          <PasswordInput
            label="Password"
            placeholder="Min. 8 characters"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            autoComplete="new-password"
            textContentType="newPassword"
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
            autoComplete="new-password"
            textContentType="newPassword"
          />
        </View>

        <View style={{ gap: 4 }}>
          <Checkbox
            checked={agreed}
            onCheckedChange={setAgreed}
            label=""
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 34, marginTop: -22 }}>
            <Text style={{ fontSize: 13, color: t.textSecondary, fontFamily: resolveFontFamily(f, '400') }}>
              I agree to the{' '}
            </Text>
            <Pressable onPress={onTermsPress}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: t.primary }}>Terms of Service</Text>
            </Pressable>
            <Text style={{ fontSize: 13, color: t.textSecondary }}> and </Text>
            <Pressable onPress={onPrivacyPress}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: t.primary }}>Privacy Policy</Text>
            </Pressable>
          </View>
          {errors.agreed && (
            <Text style={{ fontSize: 12, color: t.error, marginLeft: 34 }}>{errors.agreed}</Text>
          )}
        </View>

        <Button
          title={loading ? 'Creating account...' : 'Create Account'}
          variant="primary"
          size="lg"
          loading={loading}
          onPress={handleSubmit}
          fullWidth
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Divider style={{ flex: 1 }} />
          <Text style={{ fontSize: 13, color: t.textTertiary, fontFamily: resolveFontFamily(f, '400') }}>
            or sign up with
          </Text>
          <Divider style={{ flex: 1 }} />
        </View>

        <View style={{ gap: 12 }}>
          <SocialButton provider="google" onPress={() => onSocialLogin?.('google')} />
          <SocialButton provider="apple" onPress={() => onSocialLogin?.('apple')} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 8 }}>
          <Text style={{ fontSize: 14, color: t.textSecondary, fontFamily: resolveFontFamily(f, '400') }}>
            Already have an account?
          </Text>
          <Pressable onPress={onSignIn}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: t.primary, fontFamily: resolveFontFamily(f, '700') }}>
              Sign In
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
