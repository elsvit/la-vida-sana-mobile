import { RootStateT } from '../store';
import { EStateName } from '../types';

export const selectCartState = (state: RootStateT) => state[EStateName.cart];

export const selectCartItemsRecord = (state: RootStateT) => selectCartState(state).items;

export const selectCartItemsArray = (state: RootStateT) =>
  Object.values(selectCartItemsRecord(state));

export const makeSelectItemQty = (productId: string) => (state: RootStateT) =>
  selectCartItemsRecord(state)[productId]?.qty ?? 0;

export const selectTotalCount = (state: RootStateT) =>
  Object.values(selectCartItemsRecord(state)).reduce((sum, it) => sum + (it.qty || 0), 0);

export const selectSubtotal = (state: RootStateT) =>
  Object.values(selectCartItemsRecord(state)).reduce((sum, it) => sum + (it.price || 0) * (it.qty || 0), 0);
