import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Select } from '@/components/ui/select';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000',
    textSecondary: '#666',
    textTertiary: '#999',
    surface: '#f5f5f5',
    surfaceActive: '#e0e0e0',
    border: '#ddd',
    overlay: 'rgba(0,0,0,0.5)',
    card: '#fff',
    primary: '#007aff',
    primarySoft: '#e6f0ff',
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('Select', () => {
  const onValueChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder', () => {
    const { getByText } = render(
      <Select options={options} onValueChange={onValueChange} placeholder="Pick a fruit" />
    );
    expect(getByText('Pick a fruit')).toBeTruthy();
  });

  it('renders options when opened', () => {
    const { getByText } = render(
      <Select options={options} onValueChange={onValueChange} />
    );
    fireEvent.press(getByText('Select...'));
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
    expect(getByText('Cherry')).toBeTruthy();
  });

  it('has accessibility props', () => {
    const { getByRole } = render(
      <Select options={options} onValueChange={onValueChange} placeholder="Pick a fruit" />
    );
    const button = getByRole('button');
    expect(button).toBeTruthy();
    expect(button.props.accessibilityLabel).toBe('Pick a fruit');
    expect(button.props.accessibilityState).toEqual(
      expect.objectContaining({ expanded: false, disabled: false })
    );
  });
});
