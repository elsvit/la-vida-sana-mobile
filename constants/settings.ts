import { ELang } from '~/types/ILang';
import { Appearance, Platform } from 'react-native';
import { es } from 'date-fns/locale';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const isDark = Appearance.getColorScheme() === 'dark'; // 'light' | 'dark' | null | undefined;

export const DEFAULT_LANG = ELang.es;
export const FALLBACK_LANG = ELang.es;
export const DEFAULT_DATE_LOCALE = es;
