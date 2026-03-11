import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Accordion } from '@/components/ui/accordion';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000',
    textSecondary: '#666',
    card: '#fff',
    border: '#ddd',
  }),
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
    useSharedValue: (val: number) => ({ value: val }),
    useAnimatedStyle: (fn: () => object) => (typeof fn === 'function' ? fn() : {}),
    withTiming: (val: number) => val,
    FadeIn: { duration: () => ({}) },
    FadeOut: { duration: () => ({}) },
  };
});

const items = [
  { key: 'a', title: 'Section A', content: 'Body of section A' },
  { key: 'b', title: 'Section B', content: 'Body of section B' },
];

describe('Accordion', () => {
  it('renders items', () => {
    const { getByText } = render(<Accordion items={items} />);
    expect(getByText('Section A')).toBeTruthy();
    expect(getByText('Section B')).toBeTruthy();
  });

  it('expands item on press', () => {
    const { getByText, queryByText } = render(<Accordion items={items} />);
    expect(queryByText('Body of section A')).toBeNull();

    fireEvent.press(getByText('Section A'));
    expect(getByText('Body of section A')).toBeTruthy();
  });
});
