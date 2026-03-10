import { Platform, type ViewStyle } from 'react-native';

// ─── Color Primitives ────────────────────────────────────────────────────────
// Never import these directly in components. Use `useTheme()` instead.

const palette = {
  white: '#ffffff',
  black: '#000000',

  // Zinc neutrals — matches shadcn (oklch hue ~286, slight cool tint)
  zinc50: '#fafafa',
  zinc100: '#f4f4f5',
  zinc200: '#e4e4e7',
  zinc300: '#d4d4d8',
  zinc400: '#a1a1ab',
  zinc500: '#71717a',
  zinc600: '#52525b',
  zinc700: '#3f3f46',
  zinc800: '#27272a',
  zinc900: '#18181b',
  zinc950: '#09090b',

  // Semantic status (constant across all themes)
  green50: '#f0fdf4',
  green400: '#34d399',
  green500: '#22c55e',
  green600: '#16a34a',
  green700: '#059669',
  red50: '#fef2f2',
  red500: '#ef4444',
  red600: '#dc2626',
  red700: '#b91c1c',
  amber50: '#fffbeb',
  amber500: '#f59e0b',
  amber600: '#d97706',
  orange500: '#f97316',
  purple500: '#8b5cf6',
  pink500: '#ec4899',
} as const;

// ─── shadcn oklch-derived primary colors ────────────────────────────────────

const shadcn = {
  // Default (monochrome — primary IS the neutral)
  defaultPrimary: '#171717',
  defaultPressed: '#0a0a0a',
  defaultFg: '#fafafa',
  defaultPrimaryDark: '#e5e5e5',
  defaultPressedDark: '#d1d1d1',
  defaultFgDark: '#171717',

  // Blue (oklch 264° — same primary in light & dark)
  bluePrimary: '#1447e6',
  bluePressed: '#0530d1',
  blueFg: '#eff6ff',
  blueLinkDark: '#2b7fff',
  blueSoft: '#eff6ff',
  blueSoftActive: '#dbeafe',

  // Green (oklch 131° — lime/grass green, same primary in light & dark)
  greenPrimary: '#5ea500',
  greenPressed: '#4c9200',
  greenFg: '#f7fee7',
  greenLinkDark: '#7ccf00',
  greenSoft: '#f7fee7',
  greenSoftActive: '#ecfccb',

  // Orange (oklch 41–47° — different primary in dark)
  orangePrimaryLight: '#f54900',
  orangePressedLight: '#df3100',
  orangeFg: '#fff7ed',
  orangePrimaryDark: '#ff6900',
  orangePressedDark: '#ee5400',
  orangeSoft: '#fff7ed',
  orangeSoftActive: '#ffedd5',

  // Red (oklch 25–27° — different primary in dark)
  redPrimaryLight: '#e7000b',
  redPressedLight: '#d10000',
  redFg: '#fef2f2',
  redPrimaryDark: '#fb2c36',
  redPressedDark: '#e40022',
  redSoft: '#fef2f2',
  redSoftActive: '#fee2e2',

  // Rose (oklch 16–17° — different primary in dark)
  rosePrimaryLight: '#ec003f',
  rosePressedLight: '#d6002e',
  roseFg: '#fff1f2',
  rosePrimaryDark: '#ff2056',
  rosePressedDark: '#e90045',
  roseSoft: '#fff1f2',
  roseSoftActive: '#ffe4e6',

  // Violet (oklch 293° — different primary in dark)
  violetPrimaryLight: '#7f22fe',
  violetPressedLight: '#7000e8',
  violetFg: '#f5f3ff',
  violetPrimaryDark: '#8e51ff',
  violetPressedDark: '#7d3af1',
  violetSoft: '#f5f3ff',
  violetSoftActive: '#ede9fe',

  // Yellow (oklch 86–92° — bright primary, DARK foreground text)
  yellowPrimaryLight: '#fdc700',
  yellowPressedLight: '#e9b400',
  yellowFg: '#733e0a',
  yellowPrimaryDark: '#f0b100',
  yellowPressedDark: '#dc9d00',
  yellowSoft: '#fefce8',
  yellowSoftActive: '#fef9c3',
} as const;

// ─── Shared structural tokens (identical across all themes) ──────────────────

const sharedTokens = {
  textOnColor: palette.white,
  textOnColorSecondary: 'rgba(255,255,255,0.85)',
  textOnColorTertiary: 'rgba(255,255,255,0.7)',
  textOnColorMuted: 'rgba(255,255,255,0.65)',

  surfaceOnColor: 'rgba(255,255,255,0.2)',
  surfaceOnColorStrong: 'rgba(255,255,255,0.25)',
  surfaceOnColorSubtle: 'rgba(255,255,255,0.15)',
  surfaceOnColorMuted: 'rgba(255,255,255,0.06)',
  borderOnColor: 'rgba(255,255,255,0.08)',

  statusMedium: palette.amber500,
  statusHigh: palette.orange500,
  statusUrgent: palette.red500,
  orange: palette.orange500,
  pink: palette.pink500,
  star: palette.amber500,

  errorPressed: palette.red700,

  codeBackground: '#1e1e2e',
  codeText: '#e2e8f0',
  codeLineNumber: 'rgba(255,255,255,0.2)',
  codeLabelText: 'rgba(255,255,255,0.4)',

  storyGradient: ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888'] as unknown as string,
};

// ─── Zinc-based neutral bases (shared by ALL themes) ────────────────────────

const neutralLight = {
  text: palette.zinc950, textSecondary: palette.zinc500, textTertiary: palette.zinc400,
  textInverse: palette.white,
  background: palette.white, backgroundSecondary: palette.zinc50,
  card: palette.white, cardPressed: palette.zinc100,
  surface: palette.zinc100, surfacePressed: palette.zinc200,
  surfaceActive: palette.zinc300, surfaceElevated: palette.white,
  border: palette.zinc200, borderStrong: palette.zinc300,
  success: palette.green600, successSoft: palette.green50,
  segmentBackground: palette.zinc200, segmentActive: palette.white,
  switchTrackOff: palette.zinc300,
  snackbar: palette.zinc900, snackbarText: palette.white,
  statusDone: palette.green500,
  purple: palette.purple500,
  backgroundElement: palette.white, backgroundSelected: palette.zinc100,

  warning: palette.amber600, warningSoft: palette.amber50,
  error: palette.red600, errorSoft: palette.red50, errorBorder: palette.red500,

  overlay: 'rgba(0,0,0,0.5)', overlayLight: 'rgba(0,0,0,0.3)', shadow: palette.black,
  overlayDark: 'rgba(0,0,0,0.6)', overlayDarkStrong: 'rgba(0,0,0,0.75)',
  overlayDarkSubtle: 'rgba(0,0,0,0.3)', surfaceOverlay: 'rgba(255,255,255,0.9)',
  readReceipt: palette.green400, onlineIndicator: palette.green500,
};

const neutralDark = {
  text: palette.zinc50, textSecondary: palette.zinc400, textTertiary: palette.zinc500,
  textInverse: palette.zinc950,
  background: palette.zinc950, backgroundSecondary: palette.zinc900,
  card: palette.zinc900, cardPressed: palette.zinc800,
  surface: palette.zinc800, surfacePressed: palette.zinc700,
  surfaceActive: palette.zinc600, surfaceElevated: palette.zinc800,
  border: 'rgba(255,255,255,0.1)', borderStrong: 'rgba(255,255,255,0.15)',
  success: palette.green500, successSoft: 'rgba(34,197,94,0.15)',
  segmentBackground: palette.zinc800, segmentActive: palette.zinc600,
  switchTrackOff: palette.zinc600,
  snackbar: palette.zinc200, snackbarText: palette.zinc950,
  statusDone: palette.green500,
  purple: palette.purple500,
  backgroundElement: palette.zinc900, backgroundSelected: palette.zinc800,

  warning: palette.amber500, warningSoft: 'rgba(245,158,11,0.15)',
  error: palette.red500, errorSoft: 'rgba(239,68,68,0.15)', errorBorder: palette.red500,

  overlay: 'rgba(0,0,0,0.6)', overlayLight: 'rgba(0,0,0,0.4)', shadow: palette.black,
  overlayDark: 'rgba(0,0,0,0.7)', overlayDarkStrong: 'rgba(0,0,0,0.8)',
  overlayDarkSubtle: 'rgba(0,0,0,0.4)', surfaceOverlay: 'rgba(255,255,255,0.12)',
  readReceipt: palette.green400, onlineIndicator: palette.green500,
};

// ─── Theme builder ──────────────────────────────────────────────────────────

type PrimarySet = {
  primary: string; primaryPressed: string; primaryForeground: string;
  primarySoft: string; primarySoftActive: string;
  linkText: string; statusLow: string;
};

function lightTheme(p: PrimarySet) {
  return { ...sharedTokens, ...neutralLight, ...p };
}
function darkTheme(p: PrimarySet) {
  return { ...sharedTokens, ...neutralDark, ...p };
}

// ─── 8 Theme Presets (exact shadcn oklch→hex colors) ────────────────────────

// 1. DEFAULT — Monochrome (primary = near-black / near-white)
const defaultLight = lightTheme({
  primary: shadcn.defaultPrimary, primaryPressed: shadcn.defaultPressed, primaryForeground: shadcn.defaultFg,
  primarySoft: palette.zinc100, primarySoftActive: palette.zinc200,
  linkText: shadcn.defaultPrimary, statusLow: palette.zinc500,
});
const defaultDark = darkTheme({
  primary: shadcn.defaultPrimaryDark, primaryPressed: shadcn.defaultPressedDark, primaryForeground: shadcn.defaultFgDark,
  primarySoft: 'rgba(229,229,229,0.1)', primarySoftActive: 'rgba(229,229,229,0.18)',
  linkText: shadcn.defaultPrimaryDark, statusLow: palette.zinc400,
});

// 2. BLUE — Same primary in light & dark
const blueLight = lightTheme({
  primary: shadcn.bluePrimary, primaryPressed: shadcn.bluePressed, primaryForeground: shadcn.blueFg,
  primarySoft: shadcn.blueSoft, primarySoftActive: shadcn.blueSoftActive,
  linkText: shadcn.bluePrimary, statusLow: shadcn.bluePrimary,
});
const blueDark = darkTheme({
  primary: shadcn.bluePrimary, primaryPressed: shadcn.bluePressed, primaryForeground: shadcn.blueFg,
  primarySoft: 'rgba(20,71,230,0.15)', primarySoftActive: 'rgba(20,71,230,0.25)',
  linkText: shadcn.blueLinkDark, statusLow: shadcn.blueLinkDark,
});

// 3. GREEN — Same primary in light & dark
const greenLight = lightTheme({
  primary: shadcn.greenPrimary, primaryPressed: shadcn.greenPressed, primaryForeground: shadcn.greenFg,
  primarySoft: shadcn.greenSoft, primarySoftActive: shadcn.greenSoftActive,
  linkText: shadcn.greenPrimary, statusLow: shadcn.greenPrimary,
});
const greenDark = darkTheme({
  primary: shadcn.greenPrimary, primaryPressed: shadcn.greenPressed, primaryForeground: shadcn.greenFg,
  primarySoft: 'rgba(94,165,0,0.15)', primarySoftActive: 'rgba(94,165,0,0.25)',
  linkText: shadcn.greenLinkDark, statusLow: shadcn.greenLinkDark,
});

// 4. ORANGE — Brighter primary in dark mode
const orangeLight = lightTheme({
  primary: shadcn.orangePrimaryLight, primaryPressed: shadcn.orangePressedLight, primaryForeground: shadcn.orangeFg,
  primarySoft: shadcn.orangeSoft, primarySoftActive: shadcn.orangeSoftActive,
  linkText: shadcn.orangePrimaryLight, statusLow: shadcn.orangePrimaryLight,
});
const orangeDark = darkTheme({
  primary: shadcn.orangePrimaryDark, primaryPressed: shadcn.orangePressedDark, primaryForeground: shadcn.orangeFg,
  primarySoft: 'rgba(255,105,0,0.15)', primarySoftActive: 'rgba(255,105,0,0.25)',
  linkText: shadcn.orangePrimaryDark, statusLow: shadcn.orangePrimaryDark,
});

// 5. RED — Brighter primary in dark mode
const redLight = lightTheme({
  primary: shadcn.redPrimaryLight, primaryPressed: shadcn.redPressedLight, primaryForeground: shadcn.redFg,
  primarySoft: shadcn.redSoft, primarySoftActive: shadcn.redSoftActive,
  linkText: shadcn.redPrimaryLight, statusLow: shadcn.redPrimaryLight,
});
const redDark = darkTheme({
  primary: shadcn.redPrimaryDark, primaryPressed: shadcn.redPressedDark, primaryForeground: shadcn.redFg,
  primarySoft: 'rgba(251,44,54,0.15)', primarySoftActive: 'rgba(251,44,54,0.25)',
  linkText: shadcn.redPrimaryDark, statusLow: shadcn.redPrimaryDark,
});

// 6. ROSE — Brighter primary in dark mode
const roseLight = lightTheme({
  primary: shadcn.rosePrimaryLight, primaryPressed: shadcn.rosePressedLight, primaryForeground: shadcn.roseFg,
  primarySoft: shadcn.roseSoft, primarySoftActive: shadcn.roseSoftActive,
  linkText: shadcn.rosePrimaryLight, statusLow: shadcn.rosePrimaryLight,
});
const roseDark = darkTheme({
  primary: shadcn.rosePrimaryDark, primaryPressed: shadcn.rosePressedDark, primaryForeground: shadcn.roseFg,
  primarySoft: 'rgba(255,32,86,0.15)', primarySoftActive: 'rgba(255,32,86,0.25)',
  linkText: shadcn.rosePrimaryDark, statusLow: shadcn.rosePrimaryDark,
});

// 7. VIOLET — Brighter primary in dark mode
const violetLight = lightTheme({
  primary: shadcn.violetPrimaryLight, primaryPressed: shadcn.violetPressedLight, primaryForeground: shadcn.violetFg,
  primarySoft: shadcn.violetSoft, primarySoftActive: shadcn.violetSoftActive,
  linkText: shadcn.violetPrimaryLight, statusLow: shadcn.violetPrimaryLight,
});
const violetDark = darkTheme({
  primary: shadcn.violetPrimaryDark, primaryPressed: shadcn.violetPressedDark, primaryForeground: shadcn.violetFg,
  primarySoft: 'rgba(142,81,255,0.15)', primarySoftActive: 'rgba(142,81,255,0.25)',
  linkText: shadcn.violetPrimaryDark, statusLow: shadcn.violetPrimaryDark,
});

// 8. YELLOW — Bright primary, DARK foreground text
const yellowLight = lightTheme({
  primary: shadcn.yellowPrimaryLight, primaryPressed: shadcn.yellowPressedLight, primaryForeground: shadcn.yellowFg,
  primarySoft: shadcn.yellowSoft, primarySoftActive: shadcn.yellowSoftActive,
  linkText: shadcn.yellowFg, statusLow: shadcn.yellowPrimaryLight,
});
const yellowDark = darkTheme({
  primary: shadcn.yellowPrimaryDark, primaryPressed: shadcn.yellowPressedDark, primaryForeground: shadcn.yellowFg,
  primarySoft: 'rgba(240,177,0,0.15)', primarySoftActive: 'rgba(240,177,0,0.25)',
  linkText: shadcn.yellowPrimaryDark, statusLow: shadcn.yellowPrimaryDark,
});

// ─── Theme Presets Map ──────────────────────────────────────────────────────

export type ThemeName = 'default' | 'blue' | 'green' | 'orange' | 'red' | 'rose' | 'violet' | 'yellow';

type TokenKeys = keyof typeof defaultLight;
export type ThemeTokens = Record<TokenKeys, string>;
export type ThemeColor = TokenKeys;

function asTokens<T extends Record<TokenKeys, string>>(t: T): ThemeTokens { return t; }

export const ThemePresets: Record<ThemeName, { light: ThemeTokens; dark: ThemeTokens }> = {
  default: { light: asTokens(defaultLight), dark: asTokens(defaultDark) },
  blue:    { light: asTokens(blueLight),    dark: asTokens(blueDark) },
  green:   { light: asTokens(greenLight),   dark: asTokens(greenDark) },
  orange:  { light: asTokens(orangeLight),  dark: asTokens(orangeDark) },
  red:     { light: asTokens(redLight),     dark: asTokens(redDark) },
  rose:    { light: asTokens(roseLight),    dark: asTokens(roseDark) },
  violet:  { light: asTokens(violetLight),  dark: asTokens(violetDark) },
  yellow:  { light: asTokens(yellowLight),  dark: asTokens(yellowDark) },
};

export const Colors = ThemePresets.default;

// ─── Theme List (for UI picker) ─────────────────────────────────────────────

export const THEME_LIST: { key: ThemeName; label: string; description: string; preview: string }[] = [
  { key: 'default', label: 'Default',  description: 'Neutral monochrome',  preview: shadcn.defaultPrimary },
  { key: 'blue',    label: 'Blue',     description: 'Classic blue',        preview: shadcn.bluePrimary },
  { key: 'green',   label: 'Green',    description: 'Fresh green',         preview: shadcn.greenPrimary },
  { key: 'orange',  label: 'Orange',   description: 'Warm orange',         preview: shadcn.orangePrimaryLight },
  { key: 'red',     label: 'Red',      description: 'Bold red',            preview: shadcn.redPrimaryLight },
  { key: 'rose',    label: 'Rose',     description: 'Soft rose',           preview: shadcn.rosePrimaryLight },
  { key: 'violet',  label: 'Violet',   description: 'Rich violet',         preview: shadcn.violetPrimaryLight },
  { key: 'yellow',  label: 'Yellow',   description: 'Bright yellow',       preview: shadcn.yellowPrimaryLight },
];

// ─── Border Radius ───────────────────────────────────────────────────────────

export const Radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const Shadows = {
  sm: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  } as ViewStyle,
  md: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  } as ViewStyle,
  lg: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  } as ViewStyle,
  xl: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  } as ViewStyle,
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ViewStyle,
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const FontSize = {
  xs: { fontSize: 11, lineHeight: 14 },
  sm: { fontSize: 13, lineHeight: 18 },
  md: { fontSize: 15, lineHeight: 22 },
  lg: { fontSize: 17, lineHeight: 24 },
  xl: { fontSize: 20, lineHeight: 28 },
  '2xl': { fontSize: 24, lineHeight: 32 },
  '3xl': { fontSize: 32, lineHeight: 40 },
  '4xl': { fontSize: 48, lineHeight: 52 },
} as const;

// ─── Font Presets ─────────────────────────────────────────────────────────────

export type FontPresetName = 'system' | 'inter' | 'poppins' | 'nunito' | 'dmSans';

export type FontFamilyTokens = {
  regular: string | undefined;
  medium: string | undefined;
  semiBold: string | undefined;
  bold: string | undefined;
};

export const FONT_PRESETS: Record<FontPresetName, FontFamilyTokens> = {
  system: {
    regular: undefined,
    medium: undefined,
    semiBold: undefined,
    bold: undefined,
  },
  inter: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
  poppins: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  },
  nunito: {
    regular: 'NunitoSans_400Regular',
    medium: 'NunitoSans_500Medium',
    semiBold: 'NunitoSans_600SemiBold',
    bold: 'NunitoSans_700Bold',
  },
  dmSans: {
    regular: 'DMSans_400Regular',
    medium: 'DMSans_500Medium',
    semiBold: 'DMSans_600SemiBold',
    bold: 'DMSans_700Bold',
  },
};

export const FONT_LIST: { key: FontPresetName; label: string; sample: string }[] = [
  { key: 'system', label: 'System', sample: 'SF Pro / Roboto' },
  { key: 'inter', label: 'Inter', sample: 'Designed for screens' },
  { key: 'poppins', label: 'Poppins', sample: 'Geometric & modern' },
  { key: 'nunito', label: 'Nunito Sans', sample: 'Soft & balanced' },
  { key: 'dmSans', label: 'DM Sans', sample: 'Clean geometric' },
];

type FontWeight = '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';

export function resolveFontFamily(
  fonts: FontFamilyTokens,
  weight: FontWeight = '400',
): string | undefined {
  if (!fonts.regular) return undefined;
  const map: Record<string, string | undefined> = {
    '400': fonts.regular, 'normal': fonts.regular,
    '500': fonts.medium,
    '600': fonts.semiBold,
    '700': fonts.bold, '800': fonts.bold, '900': fonts.bold, 'bold': fonts.bold,
  };
  return map[weight] ?? fonts.regular;
}

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const MaxContentWidth = 800;

// ─── Brand Colors (non-themeable, constant across modes) ─────────────────────

export const BrandColors = {
  visa: '#1a1f71',
  mastercard: '#eb001b',
  amex: '#006fcf',
  paypal: '#003087',
  googlePay: '#4285f4',
  applePay: '#000000',
  bank: '#059669',

  google: { bg: '#ffffff', text: '#1f1f1f' },
  apple: { bg: '#000000', text: '#ffffff' },
  facebook: { bg: '#1877f2', text: '#ffffff' },
  twitter: { bg: '#000000', text: '#ffffff' },
  github: { bg: '#24292f', text: '#ffffff' },
} as const;

export const CardGradients = {
  dark: ['#1a1a2e', '#16213e'],
  blue: ['#1e3a5f', '#2563eb'],
  purple: ['#667eea', '#764ba2'],
} as const;

export const SplashColors = {
  gradientStart: '#3C9FFE',
  gradientEnd: '#0274DF',
  solid: '#208AEF',
} as const;
