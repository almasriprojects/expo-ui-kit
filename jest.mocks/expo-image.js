const React = require('react');
const { View } = require('react-native');

const Image = React.forwardRef((props, ref) =>
  React.createElement(View, { ...props, ref, testID: props.testID || 'expo-image' }),
);
Image.displayName = 'MockExpoImage';

module.exports = { Image };
