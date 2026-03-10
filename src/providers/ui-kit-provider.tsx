import React, { type ReactNode, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { ThemeModeProvider } from './theme-mode-provider';
import { ToastProvider } from './toast-provider';

type UIKitProviderProps = {
  children: ReactNode;
  /** Callback fired once all fonts are loaded and the provider is ready */
  onReady?: () => void;
};

const fontMap = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} as const;

SplashScreen.preventAutoHideAsync();

export function UIKitProvider({ children, onReady }: UIKitProviderProps) {
  const [fontsLoaded] = useFonts(fontMap);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      onReady?.();
    }
  }, [fontsLoaded, onReady]);

  if (!fontsLoaded) return null;

  return (
    <ThemeModeProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ToastProvider>{children}</ToastProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeModeProvider>
  );
}
