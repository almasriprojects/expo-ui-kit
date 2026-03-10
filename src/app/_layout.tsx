import '@/global.css';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['SafeAreaView has been deprecated']);

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
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
