import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import { Tabs } from '@/components/ui/tabs';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000',
    surface: '#f5f5f5',
    segmentActive: '#fff',
  }),
}));

jest.mock('@/hooks/use-font', () => ({
  useFont: () => ({}),
}));

jest.mock('react-native-reanimated', () => {
  const RN = require('react-native');
  return {
    __esModule: true,
    default: {
      View: RN.View,
      Text: RN.Text,
      createAnimatedComponent: (c: any) => c,
    },
    FadeIn: { duration: () => ({}) },
  };
});

const tabs = [
  { key: 'one', label: 'Tab One', content: <Text>Content One</Text> },
  { key: 'two', label: 'Tab Two', content: <Text>Content Two</Text> },
];

describe('Tabs', () => {
  it('renders tabs', () => {
    const { getByText } = render(<Tabs tabs={tabs} />);
    expect(getByText('Tab One')).toBeTruthy();
    expect(getByText('Tab Two')).toBeTruthy();
  });

  it('shows correct content for active tab', () => {
    const { getByText, queryByText } = render(<Tabs tabs={tabs} />);
    expect(getByText('Content One')).toBeTruthy();
    expect(queryByText('Content Two')).toBeNull();

    fireEvent.press(getByText('Tab Two'));
    expect(getByText('Content Two')).toBeTruthy();
    expect(queryByText('Content One')).toBeNull();
  });
});
