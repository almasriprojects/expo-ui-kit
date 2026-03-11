# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-11

### Added

- **254 UI components** across 20+ categories (Core, Forms, Layout, Overlay, Navigation, Charts, Social, Commerce, and more)
- **8 color theme presets** (Default, Blue, Green, Orange, Red, Rose, Violet, Yellow) with light and dark mode
- **5 font presets** (System, Inter, Poppins, Nunito Sans, DM Sans) switchable at runtime
- **UIKitProvider** consolidating SafeAreaProvider, GestureHandlerRootView, ThemeModeProvider, ToastProvider, and ErrorBoundary
- **Centralized design system** with tokens for colors, typography (FontSize), spacing, border radius (Radius), shadows (Shadows), and animation (Animation)
- **Icon system** using lucide-react-native with 90+ icons mapped centrally
- **10 app template demos** (Marketplace, Finance, Social, Messaging, Food, Booking, Projects, Fitness, Education, Real Estate)
- **5 auth screen templates** (Sign In, Sign Up, Forgot Password, OTP, Reset Password)
- **Kitchen sink showcase** with 12 categorized demo sections on the Home tab
- **Theme persistence** via AsyncStorage for color theme, font preset, and light/dark mode
- **Setup script** (`npm run setup`) for bootstrapping new apps from the template
- **Unit tests** for 20 core components using Jest and React Native Testing Library
- **CI/CD** via GitHub Actions (lint, typecheck, test, build verification)
- **Dependabot** for automated dependency updates
- **React.memo** on 10 frequently re-rendered list-item components
- **Accessibility** props on all interactive components
- **peerDependencies** for React, React Native, Expo, and related libraries
- **GitHub templates** for issues (bug report, feature request) and pull requests
- **CONTRIBUTING.md** with development setup, standards, and PR process
