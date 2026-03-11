import React from 'react';
import { render } from '@testing-library/react-native';

import { Badge } from '@/components/ui/badge';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    surface: '#f4f4f5',
    textSecondary: '#71717a',
    successSoft: '#f0fdf4',
    success: '#16a34a',
    warningSoft: '#fffbeb',
    warning: '#d97706',
    errorSoft: '#fef2f2',
    error: '#dc2626',
    primarySoft: '#eff6ff',
    primary: '#1447e6',
    text: '#09090b',
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

describe('Badge', () => {
  it('renders with label', () => {
    const { getByText } = render(<Badge label="New" />);
    expect(getByText('New')).toBeTruthy();
  });

  it.each(['default', 'success', 'warning', 'error', 'info'] as const)(
    'renders variant=%s without crashing',
    (variant) => {
      const { getByText } = render(<Badge label="Status" variant={variant} />);
      expect(getByText('Status')).toBeTruthy();
    },
  );
});
