import React from 'react';
import { render } from '@testing-library/react-native';

import { Progress } from '@/components/ui/progress';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    primary: '#000',
    surfacePressed: '#e4e4e7',
    text: '#09090b',
    textSecondary: '#71717a',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
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

describe('Progress', () => {
  it('renders with value', () => {
    const { toJSON } = render(<Progress value={50} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with label showing percentage', () => {
    const { getByText } = render(<Progress value={75} showLabel />);
    expect(getByText('Progress')).toBeTruthy();
    expect(getByText('75%')).toBeTruthy();
  });

  it('clamps value to 0-100 range', () => {
    const { getByText } = render(<Progress value={150} showLabel />);
    expect(getByText('100%')).toBeTruthy();
  });

  it('renders different variants', () => {
    const variants = ['default', 'success', 'warning', 'error'] as const;
    variants.forEach((variant) => {
      const { toJSON } = render(<Progress value={50} variant={variant} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  it('renders different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { toJSON } = render(<Progress value={50} size={size} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  it('calculates percentage with custom max', () => {
    const { getByText } = render(<Progress value={25} max={50} showLabel />);
    expect(getByText('50%')).toBeTruthy();
  });
});
