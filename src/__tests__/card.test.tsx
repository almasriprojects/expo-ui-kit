import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { Card } from '@/components/ui/card';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    surfaceElevated: '#fff',
    border: '#e4e4e7',
    card: '#fff',
    text: '#09090b',
    textSecondary: '#71717a',
  }),
}));

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Card>
        <Text>Card content</Text>
      </Card>,
    );
    expect(getByText('Card content')).toBeTruthy();
  });

  it('renders with title', () => {
    const { getByText } = render(<Card title="Card Title" />);
    expect(getByText('Card Title')).toBeTruthy();
  });

  it('renders with subtitle', () => {
    const { getByText } = render(
      <Card title="Title" subtitle="Subtitle text" />,
    );
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Subtitle text')).toBeTruthy();
  });

  it('renders elevated variant by default', () => {
    const { getByText } = render(<Card title="Elevated" />);
    expect(getByText('Elevated')).toBeTruthy();
  });

  it('renders outlined variant', () => {
    const { getByText } = render(<Card title="Outlined" variant="outlined" />);
    expect(getByText('Outlined')).toBeTruthy();
  });

  it('renders filled variant', () => {
    const { getByText } = render(<Card title="Filled" variant="filled" />);
    expect(getByText('Filled')).toBeTruthy();
  });
});
