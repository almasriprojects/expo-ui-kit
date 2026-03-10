import { useMemo } from 'react';

import { FONT_PRESETS, type FontFamilyTokens } from '@/constants/theme';
import { useThemeMode } from '@/providers/theme-mode-provider';

export function useFont(): FontFamilyTokens {
  const { fontPreset } = useThemeMode();
  return useMemo(() => FONT_PRESETS[fontPreset], [fontPreset]);
}
