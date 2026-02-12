import { darkPalette, lightPalette } from '../palette';
import { registerThemes } from './registerThemes';

const useColorScheme = (): 'light' | 'dark' => 'light';

export const styleSheetFactory = registerThemes(
  { light: lightPalette, dark: darkPalette },
  useColorScheme,
);

export const SPACING = 4;

export const spacing = (size = 1) => SPACING * size;
