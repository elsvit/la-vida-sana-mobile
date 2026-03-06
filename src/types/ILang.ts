import { Locale } from 'date-fns';

export enum ELang {
  en = 'en',
  es = 'es',
}

export interface IAvailableLanguages {
  code: ELang;
  name: string;
  englishName?: string;
  dateLocale?: Locale | undefined;
}

export type KeyOfJson<T> = {
  [K in keyof T]-?: T[K] extends PrimitiveType
    ? `${string & K}`
    : `${string & K}` | `${`${string & K}`}.${KeyOfJson<T[K]>}`;
}[keyof T];
