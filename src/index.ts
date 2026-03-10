// ── Providers ──
export { UIKitProvider } from './providers/ui-kit-provider';
export { ThemeModeProvider, useThemeMode } from './providers/theme-mode-provider';
export { AppProviders } from './providers/app-providers';

// ── Hooks ──
export { useTheme } from './hooks/use-theme';
export { useFont } from './hooks/use-font';
export { useColorScheme } from './hooks/use-color-scheme';
export { useDebounce } from './hooks/use-debounce';
export { useKeyboard } from './hooks/use-keyboard';

// ── Constants & Theme ──
export {
  Colors,
  Fonts,
  FontSize,
  Spacing,
  Radius,
  Shadows,
  MaxContentWidth,
  BrandColors,
  CardGradients,
  SplashColors,
  ThemePresets,
  THEME_LIST,
  FONT_PRESETS,
  FONT_LIST,
  resolveFontFamily,
} from './constants/theme';
export type {
  ThemeTokens,
  ThemeColor,
  ThemeName,
  FontPresetName,
  FontFamilyTokens,
} from './constants/theme';

// ── Layout ──
export { Screen, ScreenScrollView } from './components/layout/screen';

// ── Themed Primitives ──
export { ThemedText } from './components/themed-text';
export { ThemedView } from './components/themed-view';
export { ExternalLink } from './components/external-link';
export { HintRow } from './components/hint-row';

// ── UI Components (143) — includes ToastProvider, useToast ──
export * from './components/ui';

// ── App Template Demos (10) + Auth Screens (5) ──
export * from './components/templates';

// ── Utilities ──
export { api, ApiError } from './lib/api';
export { storage } from './lib/storage';
export * from './utils/format';
export * from './utils/platform';
export * from './utils/haptics';
