import React from 'react';
import { render } from '@testing-library/react-native';

import { Alert } from '@/components/ui/alert';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    surface: '#f4f4f5',
    border: '#e4e4e7',
    text: '#09090b',
    textSecondary: '#71717a',
    successSoft: '#f0fdf4',
    success: '#16a34a',
    warningSoft: '#fffbeb',
    warning: '#d97706',
    errorSoft: '#fef2f2',
    error: '#dc2626',
    primarySoft: '#eff6ff',
    primary: '#1447e6',
  }),
}));

jest.mock('@/hooks/use-font', () => ({
  useFont: () => ({
    regular: undefined,
    medium: undefined,
    semiBold: undefined,
    bold: undefined,
  }),
}));

describe('Alert', () => {
  it('renders with message', () => {
    const { getByText } = render(<Alert message="Something happened" />);
    expect(getByText('Something happened')).toBeTruthy();
  });

  it('renders with title and message', () => {
    const { getByText } = render(
      <Alert title="Heads up" message="This is an alert" />,
    );
    expect(getByText('Heads up')).toBeTruthy();
    expect(getByText('This is an alert')).toBeTruthy();
  });

  it.each(['default', 'success', 'warning', 'error', 'info'] as const)(
    'renders variant=%s without crashing',
    (variant) => {
      const { getByText } = render(
        <Alert message="Alert message" variant={variant} />,
      );
      expect(getByText('Alert message')).toBeTruthy();
    },
  );
});
