import React from 'react';
import type { ComponentProps } from 'react';
// import { StyleProp, TextStyle } from 'react-native';

import { Switch as PaperSwitch } from 'react-native-paper';

export type PaperSwitchProps = ComponentProps<typeof PaperSwitch>;

export const Switch: React.FC<PaperSwitchProps> = ({
  children,
  ...rest
}) => {
  return (
    <PaperSwitch {...rest}>
      {children}
    </PaperSwitch>
  );
};
