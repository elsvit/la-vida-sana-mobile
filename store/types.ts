import { IStateAccount } from './account/types';
import { IStateDishes } from './dishes/types';
import { IStateCommon } from './common/types';
import { IStateProducts } from './products/types';
import { IStateGenericProducts } from './genericProducts/types';
import { IStateUsers } from './users/types';

export enum EStateName {
  common = 'common',
  account = 'account',
  dishes = 'dishes',
  products = 'products',
  genericProducts = 'genericProducts',
  users = 'users',
}

export interface IState {
  [EStateName.common]: IStateCommon;
  [EStateName.account]: IStateAccount;
  [EStateName.dishes]: IStateDishes;
  [EStateName.products]: IStateProducts;
  [EStateName.genericProducts]: IStateGenericProducts;
  [EStateName.users]: IStateUsers;
}

export type Saga = (...args: any[]) => Generator<any>;
