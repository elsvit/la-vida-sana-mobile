import { RootStateT } from '~/store';
import { EStateName } from '../types';
import { genericProductsAdapter } from './slice';

// Base selectors
export const getGenericProductsState = (state: RootStateT) =>
  state[EStateName.genericProducts];

// Adapter selectors
export const {
  selectAll: selectAllGenericProducts,
  selectById: selectGenericProductById,
  selectIds: selectGenericProductIds,
  selectEntities: selectGenericProductEntities,
  selectTotal: selectTotalGenericProducts,
} = genericProductsAdapter.getSelectors(
  (state: RootStateT) => state?.[EStateName.genericProducts],
);

export const selectAllGenericProductCategories = (state: RootStateT) =>
  state?.[EStateName.genericProducts]?.categories || [];

