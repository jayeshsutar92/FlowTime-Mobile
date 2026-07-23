module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-safe-area-context|react-native-screens|react-native-gesture-handler|react-native-svg|lucide-react-native)/)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
