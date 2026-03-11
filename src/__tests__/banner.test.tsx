import React from 'react';
import { render } from '@testing-library/react-native';

import { Banner } from '@/components/ui/banner';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000',
    textSecondary: '#666',
    textOnColor: '#fff',
    primarySoft: '#e6f0ff',
    primary: '#007aff',
    successSoft: '#e8f5e9',
    success: '#4caf50',
    warningSoft: '#fff3e0',
    warning: '#ff9800',
    errorSoft: '#fde8e7',
    error: '#f44336',
  }),
}));

describe('Banner', () => {
  it('renders with message', () => {
    const { getByText } = render(<Banner message="Something happened" />);
    expect(getByText('Something happened')).toBeTruthy();
  });

  it('renders different variants', () => {
    const { getByText: getInfo } = render(
      <Banner message="Info message" variant="info" />
    );
    expect(getInfo('Info message')).toBeTruthy();

    const { getByText: getSuccess } = render(
      <Banner message="Success message" variant="success" />
    );
    expect(getSuccess('Success message')).toBeTruthy();

    const { getByText: getWarning } = render(
      <Banner message="Warning message" variant="warning" />
    );
    expect(getWarning('Warning message')).toBeTruthy();

    const { getByText: getError } = render(
      <Banner message="Error message" variant="error" />
    );
    expect(getError('Error message')).toBeTruthy();
  });
});
