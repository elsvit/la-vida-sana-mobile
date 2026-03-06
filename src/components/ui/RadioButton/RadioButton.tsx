import React from 'react';
import type { ComponentProps } from 'react';

// import { StyleProp, TextStyle } from 'react-native';

import { RadioButton as PaperRadioButton } from 'react-native-paper';

export type PaperRadioButtonProps = ComponentProps<typeof PaperRadioButton>;

interface RadioButtonComponent extends React.FC<PaperRadioButtonProps> {
  Group: typeof PaperRadioButton.Group;
}

const RadioButtonBase: React.FC<PaperRadioButtonProps> = ({ ...rest }) => {
  return <PaperRadioButton {...rest} />;
};

export const RadioButton = RadioButtonBase as RadioButtonComponent;
RadioButton.Group = PaperRadioButton.Group;
