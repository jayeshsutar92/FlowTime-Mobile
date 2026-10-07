import React, { useId } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { colors } from '../theme';

type Props = {
  style?: StyleProp<ViewStyle>;
  from?: string;
  to?: string;
  /** Border radius to clip the gradient to. */
  borderRadius?: number;
  children?: React.ReactNode;
};

/**
 * 135° linear gradient background (web: bg-gradient-primary).
 * Built on react-native-svg so no extra native gradient dependency is needed.
 */
export function Gradient({
  style,
  from = colors.gradientStart,
  to = colors.gradientEnd,
  borderRadius = 0,
  children,
}: Props) {
  const id = useId().replace(/:/g, '');
  return (
    <View style={[{ borderRadius, overflow: 'hidden' }, style]}>
      <Svg style={StyleSheet.absoluteFillObject} width="100%" height="100%">
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={from} />
            <Stop offset="1" stopColor={to} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
      {children}
    </View>
  );
}
