# Expo UI Kit

A production-ready **React Native component library** built with Expo SDK 54. Features **143 UI components**, **10 app template demos**, **8 color themes**, **5 font presets**, and full light/dark mode support — all driven by a single centralized theme file.

Think of it as **shadcn/ui for React Native**.

## Highlights

- **143 reusable components** — buttons, inputs, cards, modals, charts, data tables, calendars, swipe cards, and much more
- **10 full app template demos** — Marketplace, Finance, Project Management, Food Delivery, Booking, Social, Messaging, Fitness, Education, Real Estate
- **8 color themes** — Default, Blue, Green, Orange, Red, Rose, Violet, Yellow (derived from shadcn's oklch palette)
- **5 font presets** — System, Inter, Poppins, Nunito Sans, DM Sans
- **Zero hardcoded colors** — every component reads from a centralized token system
- **Light & dark mode** — automatic or manual toggle, persisted via AsyncStorage
- **Kitchen-sink showcase** — the Home tab displays every component categorized like gluestack.io

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK 54 + Expo Router |
| Styling | Inline styles via theme tokens (NativeWind available) |
| Animations | React Native Reanimated |
| Gestures | React Native Gesture Handler |
| Fonts | expo-google-fonts (Inter, Poppins, Nunito Sans, DM Sans) |
| Storage | AsyncStorage (theme/font persistence) |
| Language | TypeScript (strict) |

## Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout, font loading, providers
│   ├── index.tsx           # Home — component showcase (kitchen sink)
│   └── explore.tsx         # Explore — app template demos
│
├── components/
│   ├── ui/                 # 143 reusable UI components
│   │   └── index.ts        # Barrel export
│   ├── templates/          # 10 full app demo screens
│   │   └── index.ts        # Barrel export
│   ├── layout/             # Screen, ScreenScrollView, SafeAreaLayout
│   ├── themed-text.tsx     # Font-aware themed Text
│   └── themed-view.tsx     # Theme-aware View
│
├── constants/
│   └── theme.ts            # ALL design tokens: colors, fonts, spacing, radii, shadows
│
├── hooks/
│   ├── use-theme.ts        # Access current color tokens
│   ├── use-font.ts         # Access current font tokens
│   ├── use-color-scheme.ts # System color scheme
│   ├── use-debounce.ts     # Debounced values
│   ├── use-keyboard.ts     # Keyboard state
│   └── use-toast.ts        # Toast notifications
│
├── providers/
│   ├── theme-mode-provider.tsx  # Theme mode, color preset, font preset
│   └── app-providers.tsx        # SafeArea + all providers
│
├── lib/
│   ├── api.ts              # Typed HTTP client
│   └── storage.ts          # AsyncStorage wrapper
│
├── utils/
│   ├── format.ts           # Date/string formatting
│   ├── platform.ts         # Platform detection
│   └── haptics.ts          # Haptic feedback
│
└── types/                  # TypeScript type definitions
```

## Start a New App

Use this repo as a template to spin up a new app with all 143 components ready to go:

```bash
git clone https://github.com/almasriprojects/expo-ui-kit.git my-new-app
cd my-new-app
node scripts/setup.js
```

The setup script will:
1. Ask for your app name
2. Update `package.json` and `app.json` automatically
3. Replace the demo screens with a clean starter screen (with theme/font pickers)
4. Initialize a fresh git repo

Then just install and run:

```bash
npm install
npx expo start
```

- Press **i** for iOS simulator
- Press **a** for Android emulator
- Press **w** for web
- Scan the QR code with **Expo Go** on your phone

## Run the Demo (Kitchen Sink)

To explore all 143 components and 10 app templates before creating your app:

```bash
git clone https://github.com/almasriprojects/expo-ui-kit.git
cd expo-ui-kit
npm install
npx expo start
```

## Theming

All design tokens live in a single file: `src/constants/theme.ts`.

### Change Colors

Pick a preset or create your own in `ThemePresets`:

```tsx
import { useThemeMode } from '@/providers/theme-mode-provider';

const { setThemeName } = useThemeMode();
setThemeName('blue'); // 'default' | 'blue' | 'green' | 'orange' | 'red' | 'rose' | 'violet' | 'yellow'
```

### Change Fonts

```tsx
const { setFontPreset } = useThemeMode();
setFontPreset('poppins'); // 'system' | 'inter' | 'poppins' | 'nunito' | 'dmSans'
```

### Access Tokens in Components

```tsx
import { useTheme } from '@/hooks/use-theme';
import { useFont } from '@/hooks/use-font';
import { resolveFontFamily } from '@/constants/theme';

const t = useTheme();     // { primary, text, background, card, border, ... }
const f = useFont();       // { regular, medium, semiBold, bold }

<Text style={{ color: t.primary, fontFamily: resolveFontFamily(f, '600') }}>
  Hello
</Text>
```

## Component Categories

| Category | Examples |
|----------|---------|
| Layout | Screen, Card, Divider, Spacer, Grid |
| Typography | ThemedText, Label, SectionHeader |
| Inputs | Input, TextArea, Checkbox, Switch, Radio, Slider, Select, DatePicker |
| Buttons | Button, IconButton, FAB, SegmentedControl |
| Feedback | Toast, Alert, Snackbar, ProgressBar, Skeleton |
| Overlays | BottomSheet, ActionSheet, Dialog, Tooltip, Popover |
| Navigation | Tabs, Breadcrumb, Stepper, Pagination |
| Data Display | DataTable, Timeline, StatCard, PricingCard, Chart |
| Media | Avatar, ImageCarousel, VideoPlayer, Gallery |
| Lists | SwipeableRow, DraggableList, Kanban, ChecklistItem |
| Commerce | ProductCard, CartItem, OrderSummary, ShippingTracker |
| Social | CommentThread, ReactionBar, StoryAvatar, ShareSheet |

## App Template Demos

The **Explore** tab showcases 10 realistic app screens:

1. **Marketplace** — product grid, filters, cart
2. **Finance** — portfolio, transactions, cards
3. **Project Management** — kanban, tasks, team
4. **Food Delivery** — restaurants, menu, order tracking
5. **Booking** — calendar, listings, reservations
6. **Social** — feed, stories, profiles
7. **Messaging** — chat, conversations, media
8. **Fitness** — workouts, stats, progress
9. **Education** — courses, lessons, quizzes
10. **Real Estate** — listings, maps, details

## Scripts

| Command | Description |
|---------|------------|
| `npm start` | Start Expo dev server |
| `npm run ios` | Run on iOS |
| `npm run android` | Run on Android |
| `npm run web` | Run on web |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm run setup` | Set up as a new app (rename, clean screens) |

## License

MIT
