import React from 'react';
import { ActivityIndicator } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import { Button } from '@/components/ui/button';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    primary: '#000',
    primaryPressed: '#111',
    primaryForeground: '#fff',
    surface: '#f4f4f5',
    surfacePressed: '#e4e4e7',
    text: '#09090b',
    textOnColor: '#fff',
    border: '#e4e4e7',
    error: '#dc2626',
    errorPressed: '#b91c1c',
  }),
}));

describe('Button', () => {
  it('renders with title text', () => {
    const { getByText } = render(<Button title="Press me" />);
    expect(getByText('Press me')).toBeTruthy();
  });

  it.each(['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const)(
    'renders variant=%s without crashing',
    (variant) => {
      const { getByText } = render(<Button title="Click" variant={variant} />);
      expect(getByText('Click')).toBeTruthy();
    },
  );

  it.each(['sm', 'md', 'lg'] as const)(
    'renders size=%s without crashing',
    (size) => {
      const { getByText } = render(<Button title="Sized" size={size} />);
      expect(getByText('Sized')).toBeTruthy();
    },
  );

  it('shows loading state', () => {
    const { getByText, UNSAFE_getByType } = render(
      <Button title="Loading" loading />,
    );
    expect(getByText('Loading')).toBeTruthy();

    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('handles onPress', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="Tap" onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('has accessibilityRole="button"', () => {
    const { getByRole } = render(<Button title="A11y" />);
    expect(getByRole('button')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Button title="Disabled" disabled onPress={onPress} />,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
