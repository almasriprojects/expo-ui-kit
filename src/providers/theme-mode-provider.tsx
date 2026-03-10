import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Appearance } from 'react-native';

import { FONT_LIST, THEME_LIST, type FontPresetName, type ThemeName } from '@/constants/theme';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeModeContextType = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  cycle: () => void;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  cycleTheme: () => void;
  fontPreset: FontPresetName;
  setFontPreset: (name: FontPresetName) => void;
};

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: 'system',
  setMode: () => {},
  isDark: false,
  cycle: () => {},
  themeName: 'default',
  setThemeName: () => {},
  cycleTheme: () => {},
  fontPreset: 'system',
  setFontPreset: () => {},
});

const MODE_KEY = '@app_theme_mode';
const NAME_KEY = '@app_theme_name';
const FONT_KEY = '@app_font_preset';
const MODE_ORDER: ThemeMode[] = ['system', 'light', 'dark'];
const THEME_ORDER: ThemeName[] = THEME_LIST.map((t) => t.key);
const FONT_ORDER: FontPresetName[] = FONT_LIST.map((f) => f.key);

function applyMode(mode: ThemeMode) {
  Appearance.setColorScheme(mode === 'system' ? null : mode);
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [themeName, setThemeNameState] = useState<ThemeName>('default');
  const [fontPreset, setFontPresetState] = useState<FontPresetName>('system');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(MODE_KEY),
      AsyncStorage.getItem(NAME_KEY),
      AsyncStorage.getItem(FONT_KEY),
    ]).then(([savedMode, savedName, savedFont]) => {
      if (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system') {
        setModeState(savedMode);
        applyMode(savedMode);
      }
      if (savedName && THEME_ORDER.includes(savedName as ThemeName)) {
        setThemeNameState(savedName as ThemeName);
      }
      if (savedFont && FONT_ORDER.includes(savedFont as FontPresetName)) {
        setFontPresetState(savedFont as FontPresetName);
      }
      setReady(true);
    });
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    applyMode(newMode);
    AsyncStorage.setItem(MODE_KEY, newMode);
  }, []);

  const cycle = useCallback(() => {
    setModeState((prev) => {
      const idx = MODE_ORDER.indexOf(prev);
      const next = MODE_ORDER[(idx + 1) % MODE_ORDER.length];
      applyMode(next);
      AsyncStorage.setItem(MODE_KEY, next);
      return next;
    });
  }, []);

  const setThemeName = useCallback((name: ThemeName) => {
    setThemeNameState(name);
    AsyncStorage.setItem(NAME_KEY, name);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeNameState((prev) => {
      const idx = THEME_ORDER.indexOf(prev);
      const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
      AsyncStorage.setItem(NAME_KEY, next);
      return next;
    });
  }, []);

  const setFontPreset = useCallback((name: FontPresetName) => {
    setFontPresetState(name);
    AsyncStorage.setItem(FONT_KEY, name);
  }, []);

  const isDark =
    mode === 'system'
      ? Appearance.getColorScheme() === 'dark'
      : mode === 'dark';

  if (!ready) return null;

  return (
    <ThemeModeContext.Provider
      value={{ mode, setMode, isDark, cycle, themeName, setThemeName, cycleTheme, fontPreset, setFontPreset }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}
