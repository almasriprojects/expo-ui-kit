import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { Drawer } from '@/components/ui/drawer';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000',
    textSecondary: '#666',
    overlay: 'rgba(0,0,0,0.5)',
    card: '#fff',
    border: '#ddd',
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

describe('Drawer', () => {
  const onClose = jest.fn();

  it('renders when visible', () => {
    const { getByText } = render(
      <Drawer visible onClose={onClose} title="Menu">
        <Text>Drawer content</Text>
      </Drawer>
    );
    expect(getByText('Drawer content')).toBeTruthy();
  });

  it('shows title', () => {
    const { getByText } = render(
      <Drawer visible onClose={onClose} title="Navigation" />
    );
    expect(getByText('Navigation')).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Drawer visible onClose={onClose}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Drawer>
    );
    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
  });
});
