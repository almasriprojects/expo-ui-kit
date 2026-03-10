import '@/global.css';

import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { AnimatedSplashOverlay } from '@/components/internal/animated-icon';
import AppTabs from '@/components/internal/app-tabs';
import { UIKitProvider } from '@/providers/ui-kit-provider';

export default function RootLayout() {
  return (
    <UIKitProvider>
      <StatusBar style="auto" />
      <AnimatedSplashOverlay />
      <AppTabs />
    </UIKitProvider>
  );
}
