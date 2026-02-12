import { RootStateT } from '../store';
import { genericProductsAdapter } from './slice';

// Base selectors
export const getGenericProductsState = (state: RootStateT) =>
  state.genericProducts;

// Adapter selectors
export const {
  selectAll: selectAllGenericProducts,
  selectById: selectGenericProductById,
  selectIds: selectGenericProductIds,
  selectEntities: selectGenericProductEntities,
  selectTotal: selectTotalGenericProducts,
} = genericProductsAdapter.getSelectors(
  (state: RootStateT) => state.genericProducts,
);
