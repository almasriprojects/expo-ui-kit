import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Checkbox } from '@/components/ui/checkbox';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    primary: '#000',
    primaryForeground: '#fff',
    borderStrong: '#d4d4d8',
    text: '#09090b',
  }),
}));

describe('Checkbox', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <Checkbox checked={false} onCheckedChange={() => {}} label="Accept terms" />,
    );
    expect(getByText('Accept terms')).toBeTruthy();
  });

  it('toggles on press', () => {
    const onCheckedChange = jest.fn();
    const { getByRole } = render(
      <Checkbox checked={false} onCheckedChange={onCheckedChange} label="Toggle" />,
    );
    fireEvent.press(getByRole('checkbox'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('shows checked state', () => {
    const { getByRole } = render(
      <Checkbox checked={true} onCheckedChange={() => {}} label="Checked" />,
    );
    const checkbox = getByRole('checkbox');
    expect(checkbox.props.accessibilityState.checked).toBe(true);
  });

  it('shows unchecked state', () => {
    const { getByRole } = render(
      <Checkbox checked={false} onCheckedChange={() => {}} label="Unchecked" />,
    );
    const checkbox = getByRole('checkbox');
    expect(checkbox.props.accessibilityState.checked).toBe(false);
  });

  it('does not toggle when disabled', () => {
    const onCheckedChange = jest.fn();
    const { getByRole } = render(
      <Checkbox checked={false} onCheckedChange={onCheckedChange} label="Disabled" disabled />,
    );
    fireEvent.press(getByRole('checkbox'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
