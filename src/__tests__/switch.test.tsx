import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Switch } from '@/components/ui/switch';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    primary: '#000',
    primaryForeground: '#fff',
    switchTrackOff: '#d4d4d8',
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

describe('Switch', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(
      <Switch value={false} onValueChange={() => {}} />,
    );
    expect(getByRole('switch')).toBeTruthy();
  });

  it('toggles on press', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <Switch value={false} onValueChange={onValueChange} />,
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('calls onValueChange with false when currently true', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <Switch value={true} onValueChange={onValueChange} />,
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  it('has accessibilityRole="switch"', () => {
    const { getByRole } = render(
      <Switch value={false} onValueChange={() => {}} />,
    );
    expect(getByRole('switch')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(
      <Switch value={false} onValueChange={() => {}} label="Dark mode" />,
    );
    expect(getByText('Dark mode')).toBeTruthy();
  });

  it('does not toggle when disabled', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <Switch value={false} onValueChange={onValueChange} disabled />,
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
