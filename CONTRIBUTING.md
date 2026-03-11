# Contributing to Expo UI Kit

Thank you for your interest in contributing. This guide covers the development setup, coding standards, and pull request process.

## Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/almasriprojects/expo-ui-kit.git
cd expo-ui-kit
```

2. **Install dependencies**

```bash
npm install --legacy-peer-deps
```

3. **Start the development server**

```bash
npm start
```

4. **Run checks**

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm test             # Unit tests
```

## Project Structure

```
src/
  app/              # Expo Router screens (kitchen sink demo)
  components/
    ui/             # Reusable UI components (the library)
    primitives/     # Base components (ThemedText, ThemedView)
    internal/       # App-internal components (not part of the public API)
    sections/       # Kitchen sink demo sections
    templates/      # App template demos
    layout/         # Screen wrappers
  constants/        # Design tokens (theme.ts)
  hooks/            # Custom hooks (useTheme, useFont)
  providers/        # Context providers (UIKitProvider, ThemeModeProvider)
  types/            # Shared TypeScript types
  lib/              # Utilities (api, storage)
```

## Coding Standards

### Components

- Every component lives in `src/components/ui/` as a single `.tsx` file
- Export the component and its Props type
- Use `useTheme()` for all colors — never hardcode hex values
- Use `Radius`, `Shadows`, `FontSize`, `Spacing`, `Animation` tokens from `@/constants/theme`
- Add JSDoc comments to all public Props
- Include `accessibilityRole` and `accessibilityLabel` on interactive elements
- Accept a `style` prop (or `ViewProps` spread) for customization
- Add the component to the barrel export in `src/components/ui/index.ts`

### Naming

- Files: `kebab-case.tsx` (e.g., `date-picker.tsx`)
- Components: `PascalCase` (e.g., `DatePicker`)
- Props types: `ComponentNameProps` (e.g., `DatePickerProps`)

### Icons

- Use `lucide-react-native` for all icons
- Import icons directly: `import { Check } from 'lucide-react-native'`
- Never use emoji or text characters as UI icons

### Testing

- Add tests for new components in `src/__tests__/`
- Test rendering, key props, and accessibility
- Run `npm test` before submitting

## Commit Messages

Follow conventional commits:

```
feat: add new DateRangePicker component
fix: correct border radius in phone-input
refactor: migrate swipeable-row to Reanimated
docs: update README with new component count
test: add unit tests for Select component
chore: update dependencies
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following the coding standards above
3. Run all checks: `npm run typecheck && npm run lint && npm test`
4. Push your branch and open a PR using the template
5. Fill in the PR description with a summary and test plan
6. Wait for CI checks to pass and a review

## Adding a New Component

1. Create `src/components/ui/my-component.tsx`
2. Define and export `MyComponentProps` type with JSDoc
3. Implement the component using theme tokens
4. Add to barrel export in `src/components/ui/index.ts`
5. Add a demo in the appropriate section file in `src/components/sections/`
6. Add a test in `src/__tests__/my-component.test.tsx`
7. Run all checks before committing
