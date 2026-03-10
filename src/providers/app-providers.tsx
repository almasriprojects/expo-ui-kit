import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeModeProvider } from './theme-mode-provider';

type AppProvidersProps = {
  children: ReactNode;
};

function NavigationTheme({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {children}
    </ThemeProvider>
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeModeProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationTheme>{children}</NavigationTheme>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeModeProvider>
  );
}
