import { isDark } from '~/constants';

import { Colors } from './colors';
import type { ThemeColors } from './types';

const commonColors = {
  male: Colors.blue500,
  female: Colors.pink500,
};

export const lightPalette: ThemeColors = {
  ...commonColors,
  background: {
    primary: Colors.grey50,
    secondary: Colors.grey100,
  },
  text: {
    primary: Colors.grey900,
    secondary: Colors.grey500,
    placeholder: Colors.grey300,
    disabled: Colors.grey400,
    link: Colors.blue500,
    error: Colors.red500,
    success: Colors.green500,
    warning: Colors.yellow500,
    info: Colors.blue500,
    button: Colors.blue500,
    buttonText: Colors.white,
    buttonTextDisabled: Colors.grey400,
  },
  border: Colors.grey300,
};

export const darkPalette: ThemeColors = {
  ...commonColors,
  background: {
    primary: Colors.grey900, // Dark background instead of white
    secondary: Colors.grey800,
  },
  text: {
    primary: Colors.white, // Light text for primary content
    secondary: Colors.grey300, // Light gray for secondary text
    placeholder: Colors.grey500, // Medium gray for placeholders
    error: Colors.red500,
    success: Colors.green500,
    warning: Colors.yellow500,
    info: Colors.blue500,
    disabled: Colors.grey400,
    link: Colors.blue500,
    button: Colors.blue500,
    buttonText: Colors.white,
    buttonTextDisabled: Colors.grey400,
  },
  border: Colors.grey300,
};

export const palette = isDark ? darkPalette : lightPalette;
