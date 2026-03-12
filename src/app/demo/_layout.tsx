import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

import { useTheme } from '@/hooks/use-theme';

export default function DemoLayout() {
  const t = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: t.card },
        headerTintColor: t.text,
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable
            onPress={() => router.replace('/more')}
            hitSlop={12}
            style={{ marginRight: 8 }}>
            <ArrowLeft size={22} color={t.text} />
          </Pressable>
        ),
      }}
    />
  );
}
