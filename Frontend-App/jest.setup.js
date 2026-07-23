import 'react-native-gesture-handler/jestSetup';

jest.mock('lucide-react-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Icon = (props) => React.createElement(View, props);
  return new Proxy({ __esModule: true, default: Icon }, {
    get: (target, prop) => target[prop] || Icon,
  });
});
