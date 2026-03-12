import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { FontSize, Radius, Shadows, Spacing, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';

import { ForgotPasswordScreen } from './auth/forgot-password-screen';
import { OTPScreen } from './auth/otp-screen';
import { ResetPasswordScreen } from './auth/reset-password-screen';
import { SignInScreen } from './auth/sign-in-screen';
import { SignUpScreen } from './auth/sign-up-screen';

const AUTH_SCREENS = [
  { key: 'signin', label: 'Sign In' },
  { key: 'signup', label: 'Sign Up' },
  { key: 'forgot', label: 'Forgot Password' },
  { key: 'otp', label: 'OTP' },
  { key: 'reset', label: 'Reset Password' },
] as const;

type AuthKey = (typeof AUTH_SCREENS)[number]['key'];

export function AuthDemo() {
  const t = useTheme();
  const f = useFont();
  const [activeScreen, setActiveScreen] = useState<AuthKey>('signin');

  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: t.border }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: Spacing[4], gap: Spacing[1.5], paddingVertical: Spacing[2.5] }}>
          {AUTH_SCREENS.map((screen) => {
            const isActive = screen.key === activeScreen;
            return (
              <Pressable
                key={screen.key}
                onPress={() => setActiveScreen(screen.key)}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                style={{
                  paddingHorizontal: Spacing[3.5],
                  paddingVertical: Spacing[1.5],
                  borderRadius: Radius.lg,
                  backgroundColor: isActive ? t.primary : t.card,
                  borderWidth: isActive ? 0 : 1,
                  borderColor: t.border,
                  ...(isActive ? Shadows.sm : {}),
                }}>
                <Text
                  style={{
                    fontSize: FontSize.xs.fontSize,
                    fontWeight: '600',
                    fontFamily: resolveFontFamily(f, '600'),
                    color: isActive ? t.primaryForeground : t.text,
                  }}>
                  {screen.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {activeScreen === 'signin' && <SignInScreen />}
        {activeScreen === 'signup' && <SignUpScreen />}
        {activeScreen === 'forgot' && <ForgotPasswordScreen />}
        {activeScreen === 'otp' && <OTPScreen />}
        {activeScreen === 'reset' && <ResetPasswordScreen />}
      </ScrollView>
    </View>
  );
}
