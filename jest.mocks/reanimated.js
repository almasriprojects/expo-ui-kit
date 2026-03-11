const React = require('react');
const { View } = require('react-native');

const AnimatedView = React.forwardRef((props, ref) =>
  React.createElement(View, { ...props, ref }),
);
AnimatedView.displayName = 'Animated.View';

module.exports = {
  __esModule: true,
  default: { View: AnimatedView },
  useSharedValue: (v) => ({ value: v }),
  useAnimatedStyle: (fn) => fn(),
  withTiming: (v) => v,
  withSpring: (v) => v,
  withDelay: (_d, v) => v,
  withSequence: (...args) => args[args.length - 1],
  withRepeat: (v) => v,
  useAnimatedRef: () => ({ current: null }),
  useAnimatedScrollHandler: () => ({}),
  useDerivedValue: (fn) => ({ value: fn() }),
  useAnimatedProps: (fn) => fn(),
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  interpolate: (v) => v,
  Extrapolation: { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' },
  FadeIn: { duration: () => ({ delay: () => ({}) }) },
  FadeOut: { duration: () => ({ delay: () => ({}) }) },
  SlideInRight: { duration: () => ({}) },
  SlideOutRight: { duration: () => ({}) },
  Layout: { duration: () => ({}) },
};
