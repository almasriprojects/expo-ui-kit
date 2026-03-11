import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { RadioGroup } from '@/components/ui/radio-group';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000',
    primary: '#007aff',
    surfaceActive: '#e0e0e0',
  }),
}));

jest.mock('@/hooks/use-font', () => ({
  useFont: () => ({}),
}));

const options = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
];

describe('RadioGroup', () => {
  const onValueChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders options', () => {
    const { getByText } = render(
      <RadioGroup options={options} value="sm" onValueChange={onValueChange} />
    );
    expect(getByText('Small')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('Large')).toBeTruthy();
  });

  it('selects option on press', () => {
    const { getByText } = render(
      <RadioGroup options={options} value="sm" onValueChange={onValueChange} />
    );
    fireEvent.press(getByText('Medium'));
    expect(onValueChange).toHaveBeenCalledWith('md');
  });
});
