import React from 'react';
import { render } from '@testing-library/react-native';

import { Slider } from '@/components/ui/slider';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#000',
    primary: '#007aff',
    surfacePressed: '#d0d0d0',
    surfaceElevated: '#fff',
  }),
}));

jest.mock('@/hooks/use-font', () => ({
  useFont: () => ({}),
}));

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const RN = require('react-native');
  return {
    __esModule: true,
    default: {
      View: RN.View,
      createAnimatedComponent: (c: any) => c,
    },
    useSharedValue: (val: number) => ({ value: val }),
    useAnimatedStyle: (fn: () => object) => (typeof fn === 'function' ? fn() : {}),
  };
});

jest.mock('react-native-gesture-handler', () => {
  const createChainable = (): any => {
    const obj: any = {};
    const chain = () => obj;
    obj.onUpdate = chain;
    obj.onEnd = chain;
    obj.hitSlop = chain;
    return obj;
  };
  return {
    GestureDetector: ({ children }: { children: any }) => children,
    Gesture: {
      Pan: () => createChainable(),
      Tap: () => createChainable(),
      Race: (...args: any[]) => args[0],
    },
  };
});

describe('Slider', () => {
  const onValueChange = jest.fn();

  it('renders with value', () => {
    const { getByLabelText } = render(
      <Slider value={50} onValueChange={onValueChange} label="Volume" />
    );
    const slider = getByLabelText('Volume');
    expect(slider).toBeTruthy();
    expect(slider.props.accessibilityValue).toEqual(
      expect.objectContaining({ now: 50, min: 0, max: 100 })
    );
  });

  it('renders with label', () => {
    const { getByText } = render(
      <Slider value={30} onValueChange={onValueChange} label="Brightness" />
    );
    expect(getByText('Brightness')).toBeTruthy();
  });
});
