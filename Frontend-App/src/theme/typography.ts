import { Platform } from 'react-native';

export const font = {
  sans: Platform.select({ android: 'sans', default: undefined }),
  sansBold: Platform.select({ android: 'sans-serif-medium', default: undefined }),
  mono: Platform.select({ android: 'monospace', default: 'Menlo' }),
};
