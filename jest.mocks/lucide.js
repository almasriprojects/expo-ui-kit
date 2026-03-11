const React = require('react');
const { View } = require('react-native');

const createMockIcon = (name) => {
  const MockIcon = (props) => React.createElement(View, { testID: `icon-${name}`, ...props });
  MockIcon.displayName = name;
  return MockIcon;
};

module.exports = new Proxy({}, {
  get: (_, name) => {
    if (name === '__esModule') return true;
    return createMockIcon(String(name));
  },
});
