import React, { useRef } from 'react';
import { Animated, Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

type Props = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

/** Pressable with the web app's `press` micro-interaction (scale to 0.96). */
export function Press({ style, children, onPressIn, onPressOut, ...rest }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const to = (v: number) =>
    Animated.spring(scale, { toValue: v, useNativeDriver: true, speed: 40, bounciness: 0 }).start();

  return (
    <Pressable
      {...rest}
      onPressIn={(e) => {
        to(0.96);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        to(1);
        onPressOut?.(e);
      }}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}
