import React from 'react';
import { render } from '@testing-library/react-native';

import { Snackbar } from '@/components/ui/snackbar';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    snackbar: '#333',
    snackbarText: '#fff',
    primaryForeground: '#fff',
    linkText: '#007aff',
    success: '#4caf50',
    error: '#f44336',
  }),
}));

jest.mock('@/hooks/use-font', () => ({
  useFont: () => ({}),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const RN = require('react-native');
  return {
    __esModule: true,
    default: {
      View: RN.View,
      createAnimatedComponent: (c: any) => c,
    },
    FadeInDown: { duration: () => ({}) },
    FadeOutDown: { duration: () => ({}) },
  };
});

describe('Snackbar', () => {
  const onDismiss = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders when visible', () => {
    const { getByText } = render(
      <Snackbar visible message="Saved successfully" onDismiss={onDismiss} />
    );
    expect(getByText('Saved successfully')).toBeTruthy();
  });

  it('shows message text', () => {
    const { getByText } = render(
      <Snackbar visible message="Item deleted" onDismiss={onDismiss} actionLabel="Undo" onAction={jest.fn()} />
    );
    expect(getByText('Item deleted')).toBeTruthy();
    expect(getByText('Undo')).toBeTruthy();
  });
});
