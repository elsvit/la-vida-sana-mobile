import { MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';
import type { MD3Colors } from 'react-native-paper/src/types';

import { isDark } from '~/constants';

// import { colorPrimitives } from './colorPrimitives';
// import { fonts } from './fonts';
import { darkPalette, lightPalette, palette } from './palette';

const MD3Theme = isDark ? MD3DarkTheme : MD3LightTheme;

/**
 * It overrides the default material design theme colors to have correct colors on react-native-paper components
 */
const colorOverrides: MD3Colors = {
  ...MD3Theme.colors,
  primary: palette.text.link,
  // onPrimary: palette.text.white, // Using for text color on primary button
  // primaryContainer: palette.primary.background,
  // onPrimaryContainer: palette.secondary.darkBlue800,

  // secondary: palette.secondary.darkBlue900,
  // onSecondary: palette.text.light,
  // secondaryContainer: palette.background.gray100,
  // onSecondaryContainer: palette.secondary.darkBlue800,

  // tertiary: palette.primary.hover,
  // onTertiary: palette.background.white,
  // tertiaryContainer: palette.primary.background,
  // onTertiaryContainer: palette.primary.text,

  // background: palette.background.white,
  // onBackground: palette.secondary.darkBlue800,
  // surface: palette.background.gray50,
  // onSurface: palette.secondary.darkBlue800,

  // surfaceVariant: palette.background.gray100,
  // onSurfaceVariant: palette.text.placeholder, // Using for unchecked radio button color
  // outline: palette.primary.default, // Using for colors on outline button

  // error: palette.error.default,
  // errorContainer: palette.error.background,
  // onError: palette.error.text,
  // onErrorContainer: palette.error.hover,

  // surfaceDisabled: colorPrimitives.blue200,
  // onSurfaceDisabled: palette.background.white,
};

export const darkColorsOverrides: MD3Colors = {
  ...colorOverrides,

  // primary: palette.other.progressBarSectionCurrentBG,

  error: '#F87171',
};

export const basePaperTheme = {
  // fonts,
  dark: isDark,
  roundness: 2,
  white: true,
  black: true,
  oxfordBlue: true,
};

export const lightPaperTheme = {
  ...MD3LightTheme,
  ...basePaperTheme,
  colors: colorOverrides,
  palette: lightPalette,
};

export const darkPaperTheme = {
  ...MD3DarkTheme,
  ...basePaperTheme,
  colors: darkColorsOverrides,
  palette: darkPalette,
};

export const paperTheme = isDark ? darkPaperTheme : lightPaperTheme;

export type ThemeOverride = typeof lightPaperTheme;

export const useAppTheme = () => useTheme<ThemeOverride>();
