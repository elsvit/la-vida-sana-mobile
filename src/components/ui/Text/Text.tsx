import React from 'react';
import type { ComponentProps } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { Text as PaperText } from 'react-native-paper';

export type PaperTextProps = ComponentProps<typeof PaperText>;

type Props = PaperTextProps & {
  weight?: 'regular' | 'medium' | 'bold';
  variant?: PaperTextProps['variant'];
};

export const Text: React.FC<Props> = ({
  weight = 'regular',
  variant = 'bodyMedium',
  style,
  children,
  ...rest
}) => {
  const weightStyle: StyleProp<TextStyle> =
    weight === 'medium'
      ? { fontWeight: '500' }
      : weight === 'bold'
        ? { fontWeight: '700' }
        : {};

  return (
    <PaperText variant={variant} style={[weightStyle, style]} {...rest}>
      {children}
    </PaperText>
  );
};
