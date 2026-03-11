import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Input } from '@/components/ui/input';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#09090b',
    textTertiary: '#a1a1ab',
    surface: '#f4f4f5',
    border: '#e4e4e7',
    error: '#dc2626',
    errorBorder: '#ef4444',
  }),
}));

describe('Input', () => {
  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" />,
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(<Input label="Email" />);
    expect(getByText('Email')).toBeTruthy();
  });

  it('shows error state', () => {
    const { getByText } = render(
      <Input label="Email" error="Invalid email" />,
    );
    expect(getByText('Invalid email')).toBeTruthy();
  });

  it('handles onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Type here" onChangeText={onChangeText} />,
    );
    fireEvent.changeText(getByPlaceholderText('Type here'), 'hello');
    expect(onChangeText).toHaveBeenCalledWith('hello');
  });

  it('has accessibilityLabel from label prop', () => {
    const { getByLabelText } = render(
      <Input label="Username" placeholder="Enter username" />,
    );
    expect(getByLabelText('Username')).toBeTruthy();
  });

  it('falls back accessibilityLabel to placeholder', () => {
    const { getByLabelText } = render(
      <Input placeholder="Search..." />,
    );
    expect(getByLabelText('Search...')).toBeTruthy();
  });

  it('renders hint text when no error', () => {
    const { getByText } = render(
      <Input label="Password" hint="At least 8 characters" />,
    );
    expect(getByText('At least 8 characters')).toBeTruthy();
  });
});
