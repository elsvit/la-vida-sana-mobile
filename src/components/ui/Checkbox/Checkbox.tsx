import React from 'react';
import type { ComponentProps } from 'react';

// import { StyleProp, TextStyle } from 'react-native';

import { Checkbox as PaperCheckbox } from 'react-native-paper';

export type PaperSwitchProps = ComponentProps<typeof PaperCheckbox>;

export const Checkbox: React.FC<PaperSwitchProps> = ({ ...rest }) => {
  return <PaperCheckbox {...rest} />;
};
