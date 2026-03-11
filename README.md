# Expo UI Kit

[![CI](https://github.com/almasriprojects/expo-ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/almasriprojects/expo-ui-kit/actions/workflows/ci.yml)

A production-ready **React Native component library** built with Expo SDK 54. Features **254 UI components**, **10 app template demos**, **5 auth screen templates**, **8 color themes**, **5 font presets**, and full light/dark mode support — all driven by a single centralized theme file.

Think of it as **shadcn/ui for React Native**.

## Highlights

- **254 reusable components** — buttons, inputs, cards, modals, charts, data tables, calendars, transitions, accessibility primitives, layout helpers, media players, and much more
- **10 full app template demos** — Marketplace, Finance, Project Management, Food Delivery, Booking, Social, Messaging, Fitness, Education, Real Estate
- **5 auth screen templates** — Sign In, Sign Up, Forgot Password, OTP Verification, Reset Password
- **8 color themes** — Default, Blue, Green, Orange, Red, Rose, Violet, Yellow (derived from shadcn's oklch palette)
- **5 font presets** — System, Inter, Poppins, Nunito Sans, DM Sans
- **Zero hardcoded colors** — every component reads from a centralized token system
- **Light & dark mode** — automatic or manual toggle, persisted via AsyncStorage
- **Accessibility** — `accessibilityRole` and `accessibilityLabel` on all interactive components
- **JSDoc** — every exported Props type fully documented
- **Tested** — 93 unit tests across 21 test suites using Jest and React Native Testing Library
- **CI/CD** — GitHub Actions for lint, typecheck, tests, and build verification
- **ErrorBoundary** — built-in crash protection wrapping the entire app
- **Kitchen-sink showcase** — the Home tab displays every component categorized like gluestack.io

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK 54 + Expo Router |
| Styling | Inline styles via design tokens |
| Icons | lucide-react-native (90+ icons) |
| Animations | React Native Reanimated |
| Gestures | React Native Gesture Handler |
| Fonts | expo-google-fonts (Inter, Poppins, Nunito Sans, DM Sans) |
| Storage | AsyncStorage (theme/font persistence) |
| Testing | Jest, jest-expo, React Native Testing Library |
| CI/CD | GitHub Actions |
| Language | TypeScript (strict) |

## Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout with UIKitProvider
│   ├── index.tsx           # Home — component showcase (kitchen sink)
│   └── explore.tsx         # Explore — app template demos
│
├── components/
│   ├── ui/                 # 254 reusable UI components
│   │   └── index.ts        # Barrel export
│   ├── primitives/         # Base components (ThemedText, ThemedView, HintRow, ExternalLink)
│   ├── templates/          # 10 app demos + 5 auth screens
│   │   ├── auth/           # Sign in, sign up, forgot password, OTP, reset
│   │   └── index.ts        # Barrel export
│   ├── sections/           # Kitchen-sink demo sections
│   ├── layout/             # Screen, ScreenScrollView
│   └── internal/           # App-internal files (tabs, splash, web badge)
│
├── constants/
│   └── theme.ts            # ALL design tokens: colors, fonts, spacing, radii, shadows, animation
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
│   ├── ui-kit-provider.tsx    # Top-level provider (SafeArea, Gestures, Theme, Toast, ErrorBoundary)
│   ├── theme-mode-provider.tsx # Theme mode, color preset, font preset
│   └── toast-provider.tsx     # Toast notification system
│
├── lib/
│   ├── api.ts              # Typed HTTP client with safe JSON parsing
│   └── storage.ts          # AsyncStorage wrapper with dev warnings
│
├── utils/
│   ├── format.ts           # Date/string formatting
│   ├── platform.ts         # Platform detection
│   └── haptics.ts          # Haptic feedback
│
├── __tests__/              # 21 test suites, 93 tests
│
└── types/                  # TypeScript type definitions
```

## Start a New App

Use this repo as a template to spin up a new app with all 254 components ready to go:

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
npm install --legacy-peer-deps
npx expo start
```

- Press **i** for iOS simulator
- Press **a** for Android emulator
- Press **w** for web
- Scan the QR code with **Expo Go** on your phone

## Run the Demo (Kitchen Sink)

To explore all 254 components and 10 app templates before creating your app:

```bash
git clone https://github.com/almasriprojects/expo-ui-kit.git
cd expo-ui-kit
npm install --legacy-peer-deps
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

## Design Token System

Every visual value is centralized in `src/constants/theme.ts`:

| Token | Usage |
|-------|-------|
| `FontSize` | `FontSize.sm.fontSize`, `FontSize.lg.fontSize`, etc. (2xs through 4xl) |
| `Spacing` | `Spacing[2]` (8px), `Spacing[4]` (16px), `Spacing[6]` (24px), etc. |
| `Radius` | `Radius.sm` (6), `Radius.md` (8), `Radius.lg` (12), `Radius.full` (9999) |
| `Shadows` | `Shadows.sm`, `Shadows.md`, `Shadows.lg`, `Shadows.xl` |
| `Animation` | `Animation.duration.fast` (150ms), `Animation.spring.bouncy`, etc. |
| `BrandColors` | `BrandColors.facebook`, `BrandColors.whatsapp`, etc. |

## Component Categories

| Category | Examples |
|----------|---------|
| Layout Primitives | Stack, VStack, HStack, Box, Center, Spacer, Wrap, ResponsiveGrid, MasonryGrid |
| Layout | Screen, Card, Divider, Separator, AspectRatio, ParallaxScrollView |
| Typography | ThemedText, Highlight, Kbd, ReadMoreText, CurrencyDisplay |
| Inputs | Input, TextArea, Checkbox, Switch, Radio, Slider, Select, DatePicker, Autocomplete, MaskedInput, CreditCardInput, SignaturePad, RichTextEditor, InlineEdit, MentionInput |
| Buttons | Button, IconButton, FAB, SplitButton, SpeedDial, BackButton, Toggle |
| Feedback | Toast, Alert, Snackbar, Progress, Skeleton, Loading, InlineNotification, Confetti |
| Overlays | Sheet, BottomSheet, ActionSheet, Modal, ConfirmDialog, Tooltip, Popover, ContextMenu, CommandPalette, ShareSheet, Portal |
| Navigation | Tabs, Breadcrumb, StepIndicator, VerticalStepper, Pagination, SegmentedControl, Accordion, AppBar, BottomNavigation, SidebarMenu, FloatingHeader, SwipeableTabView |
| Data Display | DataTable, Timeline, StatCard, Statistic, PricingCard, CountdownTimer, AnimatedCounter, DescriptionList, ComparisonTable, Label |
| Charts | BarChart, LineChart, AreaChart, PieChart, DonutChart, Sparkline, Gauge, HorizontalBarChart, HeatmapCalendar |
| Media | Avatar, AvatarGroup, ImageCarousel, Carousel, ImageViewer, ProductGallery, VideoThumbnail, AudioWaveform, AudioPlayer, VideoPlayer, QRCode |
| Lists | SwipeableRow, SwipeCards, KanbanBoard, SortableList, InfiniteScrollList, StickyHeaderList, TreeView, ChecklistItem, ScrollArea |
| Date & Time | DatePicker, TimePicker, DateRangePicker, CalendarStrip |
| Commerce | ProductCard, CartItem, OrderSummary, ShippingTracker, PriceTag, Receipt, CouponCard, SizeSelector, ColorSwatchSelector, TipSelector, SubscriptionCard, InventoryBadge |
| Social | CommentCard, PostCard, StoryCircle, FollowButton, ChatBubble, ReactionBar, Poll, EmojiPicker, VoiceMessageBubble, ReadReceipt, ActivityFeed |
| Maps & Location | MapMarker, LocationSearch, RouteSummary, NearbyList |
| Settings & Account | SettingsScreen, ProfileHeader, LanguageSelector, DeleteAccountFlow, AboutScreen, LegalScreen |
| Onboarding | WalkthroughSlides, CoachMark, PermissionRequest, WelcomeScreen |
| Status & Screens | NotificationCenter, BadgeCounter, ConnectionStatus, MaintenanceScreen, UpdateRequiredScreen, SuccessScreen, ErrorScreen |
| Transitions | FadeTransition, SlideTransition, CollapseTransition, ScaleTransition |
| Accessibility | VisuallyHidden, ScreenReaderAnnounce, ReducedMotionWrapper |
| Auth | SignInScreen, SignUpScreen, ForgotPasswordScreen, OTPScreen, ResetPasswordScreen |
| Error Handling | ErrorBoundary |

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

## Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

21 test suites covering 20 core components: Button, Input, Textarea, Card, Badge, Avatar, Switch, Checkbox, Alert, Progress, Divider, Select, Tabs, Accordion, Modal, Drawer, Banner, Snackbar, RadioGroup, Slider.

## Scripts

| Command | Description |
|---------|------------|
| `npm start` | Start Expo dev server |
| `npm run ios` | Run on iOS |
| `npm run android` | Run on Android |
| `npm run web` | Run on web |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm test` | Run unit tests |
| `npm run test:coverage` | Tests with coverage |
| `npm run setup` | Set up as a new app (rename, clean screens) |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, coding standards, and PR process.

## License

MIT
