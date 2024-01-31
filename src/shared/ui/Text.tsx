import React from 'react';
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

type Sizes = keyof typeof $sizeStyles;

export interface TextProps extends RNTextProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the different types of text presets.
   */
  /**
   * Text weight modifier.
   */
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  mute?: boolean;
  white?: boolean;
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  const { white = false, size, text, children, mute = false, ...rest } = props;

  const content = text || children;
  if (!content) return null;

  return <RNText {...rest}>{content}</RNText>;
}

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } as TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } as TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } as TextStyle,
  md: { fontSize: 18, lineHeight: 26 } as TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } as TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } as TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } as TextStyle,
};

const $baseStyle: StyleProp<TextStyle> = [$sizeStyles.sm];

const $mute: TextStyle = {};
