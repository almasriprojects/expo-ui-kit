import React from 'react';
import { render } from '@testing-library/react-native';

import { Avatar } from '@/components/ui/avatar';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    primary: '#000',
    primaryForeground: '#fff',
    text: '#09090b',
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

describe('Avatar', () => {
  it('renders with initials', () => {
    const { getByText } = render(<Avatar initials="AB" />);
    expect(getByText('AB')).toBeTruthy();
  });

  it('renders fallback "?" when no initials provided', () => {
    const { getByText } = render(<Avatar />);
    expect(getByText('?')).toBeTruthy();
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'renders size=%s without crashing',
    (size) => {
      const { getByText } = render(<Avatar initials="XY" size={size} />);
      expect(getByText('XY')).toBeTruthy();
    },
  );

  it('has accessibilityRole="image"', () => {
    const { getByLabelText } = render(<Avatar initials="AB" />);
    const avatar = getByLabelText('AB');
    expect(avatar.props.accessibilityRole).toBe('image');
  });

  it('renders image when source is provided', () => {
    const { getByTestId } = render(
      <Avatar source="https://example.com/photo.jpg" />,
    );
    expect(getByTestId('expo-image')).toBeTruthy();
  });
});
