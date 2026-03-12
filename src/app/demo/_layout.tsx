import { Stack } from 'expo-router';
import React from 'react';

import { useTheme } from '@/hooks/use-theme';

export default function DemoLayout() {
  const t = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: t.card },
        headerTintColor: t.text,
        headerShadowVisible: false,
        headerBackTitle: 'Back',
      }}
    />
  );
}
