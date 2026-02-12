import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type AppearanceProvider<T> = () => T;

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export type StyleSheetData<N extends string, T, S> = {
  styles: Record<N, S>;
  themes: Record<N, T>;
  appearanceProvider: AppearanceProvider<N>;
};

export enum TextVariant {
  h1 = 'h1', // Mega title
  h2 = 'h2', // Big title
  h3 = 'h3', // Title
  h4Bright = 'h4Bright', // Big text - bright
  h4 = 'h4', // Big text - bold
  h5Bright = 'h5Bright', // Running text - bright
  h5 = 'h5', // Running text
  h5Bold = 'h5Bold', // Running text - bold
  h6 = 'h6', // Link
  h7Bright = 'h7Bright', // Small text - bright
  h7Dark = 'h7Dark', // Small text - dark
  h8 = 'h8', // Mini text

  baseSmall = 'baseSmall', // Small text
  base = 'base', // Base text
  baseLarge = 'baseLarge', // Large text

  linkSmall = 'linkSmall', // Small link
  linkBase = 'linkBase', // Link
  linkLarge = 'linkLarge', // Large link
}

export type ThemeColors = {
  male: string;
  female: string;

  background: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
    placeholder: string;
    disabled: string;
    link: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    button: string;
    buttonText: string;
    buttonTextDisabled: string;
  };
  border: string;
};

export type PaperTheme = ThemeColors;
