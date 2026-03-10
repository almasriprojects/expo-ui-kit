import { useMemo } from 'react';

import { ThemePresets, type ThemeTokens } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeMode } from '@/providers/theme-mode-provider';

export function useTheme(): ThemeTokens {
  const scheme = useColorScheme();
  const { themeName } = useThemeMode();
  const mode = scheme === 'dark' ? 'dark' : 'light';

  return useMemo(() => ThemePresets[themeName][mode], [themeName, mode]);
}
