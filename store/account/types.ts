import { ELang } from '~/types/ILang';

export enum ERole {
  admin = 'admin',
  reader = 'reader',
}

export interface IStateAccount {
  role: ERole;
  lang: ELang | null;
  isLangInitiating: boolean | null;
}
