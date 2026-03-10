import React, { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/layout';
import { Snackbar } from '@/components/ui';
import { FONT_LIST, FONT_PRESETS, Radius, Shadows, THEME_LIST, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';
import { useThemeMode } from '@/providers/theme-mode-provider';

import {
  AdvancedSection,
  ControlsSection,
  DisplaySection,
  FeedbackSection,
  FormsSection,
  LayoutSection,
  OverlaySection,
} from './sections';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'forms', label: 'Forms' },
  { key: 'controls', label: 'Controls' },
  { key: 'display', label: 'Display' },
  { key: 'feedback', label: 'Feedback' },
  { key: 'overlay', label: 'Overlay' },
  { key: 'layout', label: 'Layout' },
  { key: 'advanced', label: 'Advanced' },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]['key'];

const modeIcons: Record<string, string> = { system: '⚙️', light: '☀️', dark: '🌙' };
const modeLabels: Record<string, string> = { system: 'Auto', light: 'Light', dark: 'Dark' };

function ThemeToggle() {
  const { themeName, setThemeName } = useThemeMode();
  const t = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}>
      {THEME_LIST.map((preset) => {
        const isActive = preset.key === themeName;
        return (
          <Pressable
            key={preset.key}
            onPress={() => setThemeName(preset.key)}
            accessibilityRole="button"
            accessibilityLabel={`${preset.label} theme`}
            accessibilityState={{ selected: isActive }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: Radius.full,
              backgroundColor: isActive ? t.primary : t.card,
              borderWidth: 1,
              borderColor: isActive ? t.primary : t.border,
              ...Shadows.sm,
            }}>
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: Radius.full,
                backgroundColor: preset.preview,
                borderWidth: 1.5,
                borderColor: isActive ? t.primaryForeground : t.border,
              }}
            />
            <Text style={{ fontSize: 12, fontWeight: '600', color: isActive ? t.primaryForeground : t.text }}>
              {preset.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function FontPicker() {
  const { fontPreset, setFontPreset } = useThemeMode();
  const t = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}>
      {FONT_LIST.map((font) => {
        const isActive = font.key === fontPreset;
        const previewFont = FONT_PRESETS[font.key];
        const fontFamily = resolveFontFamily(previewFont, '600');
        return (
          <Pressable
            key={font.key}
            onPress={() => setFontPreset(font.key)}
            accessibilityRole="button"
            accessibilityLabel={`${font.label} font`}
            accessibilityState={{ selected: isActive }}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: Radius.lg,
              backgroundColor: isActive ? t.primary : t.card,
              borderWidth: 1,
              borderColor: isActive ? t.primary : t.border,
              ...Shadows.sm,
            }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: isActive ? t.primaryForeground : t.text, fontFamily }}>
              {font.label}
            </Text>
            <Text style={{ fontSize: 10, color: isActive ? t.primaryForeground : t.textTertiary, marginTop: 1, fontFamily: resolveFontFamily(previewFont, '400') }}>
              {font.sample}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function CategoryBar({ active, onSelect }: { active: CategoryKey; onSelect: (key: CategoryKey) => void }) {
  const t = useTheme();
  const f = useFont();

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: t.border }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingVertical: 14 }}>
        {CATEGORIES.map((cat) => {
          const isActive = cat.key === active;
          return (
            <Pressable
              key={cat.key}
              onPress={() => onSelect(cat.key)}
              accessibilityRole="tab"
              accessibilityLabel={cat.label}
              accessibilityState={{ selected: isActive }}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 10,
                borderRadius: Radius.full,
                backgroundColor: isActive ? t.primary : t.card,
                borderWidth: isActive ? 0 : 1,
                borderColor: t.border,
                ...(isActive ? Shadows.sm : {}),
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  fontFamily: resolveFontFamily(f, '600'),
                  color: isActive ? t.primaryForeground : t.text,
                }}>
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default function HomeScreen() {
  const t = useTheme();
  const fonts = useFont();
  const { mode, cycle } = useThemeMode();
  const scrollRef = useRef<ScrollView>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [snackVisible, setSnackVisible] = useState(false);

  const sectionOffsets = useRef<Record<string, number>>({});
  const handleLayout = useCallback(
    (key: string) => (e: { nativeEvent: { layout: { y: number } } }) => {
      sectionOffsets.current[key] = e.nativeEvent.layout.y;
    },
    [],
  );

  const scrollToCategory = useCallback((key: CategoryKey) => {
    setActiveCategory(key);
    if (key === 'all') {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      const y = sectionOffsets.current[key];
      if (y != null) scrollRef.current?.scrollTo({ y: y - 20, animated: true });
    }
  }, []);

  return (
    <Screen>
      {/* Header */}
      <View style={{ backgroundColor: t.background, paddingTop: 8, paddingBottom: 8, gap: 10 }}>
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 28, fontWeight: '800', fontFamily: resolveFontFamily(fonts, '700'), color: t.text }}>
              UI Kit
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '500', fontFamily: resolveFontFamily(fonts, '500'), color: t.textSecondary, marginTop: 2 }}>
              Production-ready components
            </Text>
          </View>
          <Pressable
            onPress={cycle}
            accessibilityRole="button"
            accessibilityLabel={`Switch mode, current: ${modeLabels[mode]}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: Radius.full,
              backgroundColor: t.card,
              borderWidth: 1,
              borderColor: t.border,
              ...Shadows.sm,
            }}>
            <Text style={{ fontSize: 16 }}>{modeIcons[mode]}</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', fontFamily: resolveFontFamily(fonts, '600'), color: t.text }}>
              {modeLabels[mode]}
            </Text>
          </Pressable>
        </View>
        <ThemeToggle />
        <FontPicker />
      </View>

      <CategoryBar active={activeCategory} onSelect={scrollToCategory} />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}>
        <View onLayout={handleLayout('forms')}><FormsSection /></View>
        <View onLayout={handleLayout('controls')}><ControlsSection /></View>
        <View onLayout={handleLayout('display')}><DisplaySection /></View>
        <View onLayout={handleLayout('feedback')}><FeedbackSection /></View>
        <View onLayout={handleLayout('overlay')}><OverlaySection /></View>
        <View onLayout={handleLayout('layout')}><LayoutSection /></View>
        <View onLayout={handleLayout('advanced')}><AdvancedSection /></View>

        <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: '500', color: t.textTertiary }}>
            Swipe to Apps tab for domain templates
          </Text>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackVisible}
        message="Item added to cart"
        actionLabel="UNDO"
        onAction={() => setSnackVisible(false)}
        onDismiss={() => setSnackVisible(false)}
      />
    </Screen>
  );
}
