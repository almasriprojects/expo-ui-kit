#!/usr/bin/env node

/**
 * Setup script for creating a new app from the expo-ui-kit template.
 *
 * Usage:
 *   git clone https://github.com/almasriprojects/expo-ui-kit.git my-app
 *   cd my-app
 *   node scripts/setup.js
 *
 * What it does:
 *   1. Prompts for your new app name
 *   2. Updates package.json and app.json with the new name
 *   3. Replaces demo screens with a clean starter screen
 *   4. Removes the old .git history and initializes a fresh repo
 *   5. Ready to build
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const root = process.cwd();
const args = process.argv.slice(2);
const autoConfirm = args.includes('--yes') || args.includes('-y');
const nameArg = args.find((a) => !a.startsWith('-'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question, fallback) {
  if (fallback !== undefined) return Promise.resolve(fallback);
  return new Promise((resolve) => rl.question(question, resolve));
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function toScheme(slug) {
  return slug.replace(/-/g, '');
}

// ── Starter screen template ──────────────────────────────────────────────────

const starterIndex = `import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { ScreenScrollView } from '@/components/layout';
import { Card, Button, Input, Badge, Avatar, Switch, Divider } from '@/components/ui';
import { Radius, Spacing, THEME_LIST, FONT_LIST, resolveFontFamily } from '@/constants/theme';
import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';
import { useThemeMode } from '@/providers/theme-mode-provider';

export default function HomeScreen() {
  const t = useTheme();
  const f = useFont();
  const { mode, setMode, themeName, setThemeName, fontPreset, setFontPreset } = useThemeMode();

  return (
    <ScreenScrollView contentContainerStyle={{ padding: Spacing.three, gap: Spacing.three }}>
      <View style={{ gap: 4, marginTop: Spacing.two }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '800',
            fontFamily: resolveFontFamily(f, '700'),
            color: t.text,
          }}>
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: resolveFontFamily(f, '400'),
            color: t.textSecondary,
          }}>
          Your app is ready. Start building!
        </Text>
      </View>

      {/* ── Light / Dark Toggle ── */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 15, fontWeight: '600', fontFamily: resolveFontFamily(f, '600'), color: t.text }}>
          {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch value={mode === 'dark'} onValueChange={(v) => setMode(v ? 'dark' : 'light')} />
      </View>

      {/* ── Theme Picker ── */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 13, fontWeight: '600', fontFamily: resolveFontFamily(f, '600'), color: t.textSecondary }}>
          Color Theme
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {THEME_LIST.map((th) => {
            const active = themeName === th.key;
            return (
              <Pressable
                key={th.key}
                onPress={() => setThemeName(th.key)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: Radius.full,
                  backgroundColor: active ? t.primary : t.surface,
                  borderWidth: active ? 0 : 1,
                  borderColor: t.border,
                }}>
                <View style={{ width: 14, height: 14, borderRadius: Radius.full, backgroundColor: th.preview }} />
                <Text style={{ fontSize: 13, fontWeight: '600', color: active ? t.primaryForeground : t.text }}>
                  {th.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Font Picker ── */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 13, fontWeight: '600', fontFamily: resolveFontFamily(f, '600'), color: t.textSecondary }}>
          Font
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {FONT_LIST.map((ft) => {
            const active = fontPreset === ft.key;
            return (
              <Pressable
                key={ft.key}
                onPress={() => setFontPreset(ft.key)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: Radius.full,
                  backgroundColor: active ? t.primary : t.surface,
                  borderWidth: active ? 0 : 1,
                  borderColor: t.border,
                }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: active ? t.primaryForeground : t.text }}>
                  {ft.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <Divider />

      {/* ── Sample Components ── */}
      <Card title="Sample Card" subtitle="Your components are ready to use">
        <View style={{ gap: 12, marginTop: 8 }}>
          <Input label="Email" placeholder="you@example.com" />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button title="Primary" variant="primary" style={{ flex: 1 }} />
            <Button title="Outline" variant="outline" style={{ flex: 1 }} />
          </View>
        </View>
      </Card>

      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Avatar initials="AK" size="lg" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', fontFamily: resolveFontFamily(f, '600'), color: t.text }}>
            User Name
          </Text>
          <Text style={{ fontSize: 13, fontFamily: resolveFontFamily(f, '400'), color: t.textSecondary }}>
            user@example.com
          </Text>
        </View>
        <Badge label="Pro" variant="info" />
      </View>

      <View style={{ height: 60 }} />
    </ScreenScrollView>
  );
}
`;

const starterLayout = `import '@/global.css';

import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { UIKitProvider } from '@/providers/ui-kit-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <UIKitProvider>
      <StatusBar style="auto" />
      {children}
    </UIKitProvider>
  );
}
`;

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║     expo-ui-kit — New App Setup      ║');
  console.log('╚══════════════════════════════════════╝\n');

  const rawName = await ask('App name (e.g. "My Awesome App"): ', nameArg);
  const appName = rawName.trim();

  if (!appName) {
    console.log('\nNo name provided. Exiting.\n');
    rl.close();
    return;
  }

  const slug = toSlug(appName);
  const scheme = toScheme(slug);

  console.log(`\n  Name:   ${appName}`);
  console.log(`  Slug:   ${slug}`);
  console.log(`  Scheme: ${scheme}\n`);

  const confirm = await ask('Proceed? (Y/n): ', autoConfirm ? 'y' : undefined);
  if (confirm.trim().toLowerCase() === 'n') {
    console.log('\nAborted.\n');
    rl.close();
    return;
  }

  // 1. Update package.json
  console.log('\n1/5  Updating package.json...');
  const pkgPath = path.join(root, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.name = slug;
  pkg.description = appName;
  delete pkg.module;
  delete pkg.types;
  delete pkg.exports;
  delete pkg.files;
  delete pkg.keywords;
  delete pkg.repository;
  delete pkg.homepage;
  delete pkg.bugs;
  pkg.private = true;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('     Done.');

  // 2. Update app.json
  console.log('2/5  Updating app.json...');
  const appJsonPath = path.join(root, 'app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  appJson.expo.name = appName;
  appJson.expo.slug = slug;
  appJson.expo.scheme = scheme;
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
  console.log('     Done.');

  // 3. Replace demo screens with starter
  console.log('3/5  Creating starter screens...');
  const appDir = path.join(root, 'src', 'app');

  fs.writeFileSync(path.join(appDir, 'index.tsx'), starterIndex);
  console.log('     Created src/app/index.tsx');

  fs.writeFileSync(path.join(appDir, '_layout.tsx'), starterLayout);
  console.log('     Created src/app/_layout.tsx');

  // Remove explore tab and demo-only files
  const filesToRemove = [
    path.join(appDir, 'explore.tsx'),
    path.join(root, 'src', 'components', 'animated-icon.tsx'),
    path.join(root, 'src', 'components', 'animated-icon.module.css'),
    path.join(root, 'src', 'components', 'app-tabs.tsx'),
    path.join(root, 'src', 'components', 'app-tabs.web.tsx'),
    path.join(root, 'src', 'components', 'web-badge.tsx'),
  ];

  for (const f of filesToRemove) {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      console.log(`     Removed ${path.relative(root, f)}`);
    }
  }

  // 4. Reset git
  console.log('4/5  Initializing fresh git repo...');
  const gitDir = path.join(root, '.git');
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }
  execSync('git init', { cwd: root, stdio: 'ignore' });
  execSync('git add -A', { cwd: root, stdio: 'ignore' });
  execSync('git commit -m "Initial commit from expo-ui-kit template"', {
    cwd: root,
    stdio: 'ignore',
  });
  console.log('     Done.');

  // 5. Summary
  console.log('5/5  Setup complete!\n');
  console.log('┌──────────────────────────────────────┐');
  console.log(`│  ${appName}`);
  console.log('├──────────────────────────────────────┤');
  console.log('│  Next steps:                         │');
  console.log('│                                      │');
  console.log('│  npm install                         │');
  console.log('│  npx expo start                      │');
  console.log('│                                      │');
  console.log('│  All 143 components are ready at:    │');
  console.log("│  import { ... } from '@/components/ui'│");
  console.log('│                                      │');
  console.log('│  Theme config:                       │');
  console.log("│  src/constants/theme.ts              │");
  console.log('└──────────────────────────────────────┘\n');

  rl.close();
}

main().catch((err) => {
  console.error('Setup failed:', err.message);
  rl.close();
  process.exit(1);
});
