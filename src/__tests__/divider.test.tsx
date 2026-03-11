import React from 'react';
import { render } from '@testing-library/react-native';

import { Divider } from '@/components/ui/divider';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    border: '#e4e4e7',
  }),
}));

describe('Divider', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Divider />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders horizontal orientation by default', () => {
    const { toJSON } = render(<Divider />);
    const tree = toJSON() as any;
    const style = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style)
      : tree.props.style;
    expect(style.height).toBe(1);
    expect(style.width).toBe('100%');
  });

  it('renders vertical orientation', () => {
    const { toJSON } = render(<Divider orientation="vertical" />);
    const tree = toJSON() as any;
    const style = Array.isArray(tree.props.style)
      ? Object.assign({}, ...tree.props.style)
      : tree.props.style;
    expect(style.width).toBe(1);
    expect(style.height).toBe('100%');
  });
});
