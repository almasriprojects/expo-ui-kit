import React from 'react';
import { render } from '@testing-library/react-native';

import { Textarea } from '@/components/ui/textarea';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000',
    textSecondary: '#666',
    textTertiary: '#999',
    surface: '#f5f5f5',
    border: '#ddd',
    errorBorder: '#f00',
    error: '#f44336',
  }),
}));

jest.mock('@/hooks/use-font', () => ({
  useFont: () => ({}),
}));

describe('Textarea', () => {
  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Textarea placeholder="Enter your message..." />
    );
    expect(getByPlaceholderText('Enter your message...')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText, getByPlaceholderText } = render(
      <Textarea label="Description" placeholder="Type here..." />
    );
    expect(getByText('Description')).toBeTruthy();
    expect(getByPlaceholderText('Type here...')).toBeTruthy();
  });

  it('shows error state', () => {
    const { getByText } = render(
      <Textarea label="Bio" error="This field is required" />
    );
    expect(getByText('This field is required')).toBeTruthy();
  });
});
