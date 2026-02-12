import { createSelector } from 'reselect';
import { RootStateT } from '../store';
import { productsAdapter } from './slice';
import { ESeller } from '../../../LaVidaSana/src/types/IProduct';

// Common seller state selector - this is the key improvement
export const getSellerState = (seller: ESeller) => (state: RootStateT) => {
  if (seller === ESeller.MERCADONA || seller === ESeller.CARREFOUR) {
    return state.products[seller];
  }
  return undefined;
};

// Base selectors (keeping for backward compatibility)
export const getMercadonaProductsState = (state: RootStateT) =>
  state.products[ESeller.MERCADONA];
export const getCarrefourProductsState = (state: RootStateT) =>
  state.products[ESeller.CARREFOUR];

// Generic seller selector with type safety
export const getSellerProductsState = (state: RootStateT, seller: ESeller) => {
  if (seller === ESeller.MERCADONA || seller === ESeller.CARREFOUR) {
    return state.products[seller];
  }
  return undefined;
};

// Seller-specific data selector
export const selectSellerProductsData = createSelector(
  [getSellerProductsState],
  sellerState => ({
    products: sellerState
      ? productsAdapter.getSelectors().selectAll(sellerState)
      : [],
    categories: sellerState?.categories || [],
  }),
);

// Common adapter selectors using the new getSellerState
export const createSellerSelectors = (seller: ESeller) => {
  const sellerStateSelector = getSellerState(seller);

  return {
    selectAll: createSelector([sellerStateSelector], sellerState =>
      sellerState ? productsAdapter.getSelectors().selectAll(sellerState) : [],
    ),
    selectById: (id: string) =>
      createSelector([sellerStateSelector], sellerState =>
        sellerState
          ? productsAdapter.getSelectors().selectById(sellerState, id)
          : undefined,
      ),
    selectIds: createSelector([sellerStateSelector], sellerState =>
      sellerState ? productsAdapter.getSelectors().selectIds(sellerState) : [],
    ),
    selectEntities: createSelector([sellerStateSelector], sellerState =>
      sellerState
        ? productsAdapter.getSelectors().selectEntities(sellerState)
        : {},
    ),
    selectTotal: createSelector([sellerStateSelector], sellerState =>
      sellerState ? productsAdapter.getSelectors().selectTotal(sellerState) : 0,
    ),
  };
};

// Create seller-specific selectors using the common factory
export const mercadonaSelectors = createSellerSelectors(ESeller.MERCADONA);
export const carrefourSelectors = createSellerSelectors(ESeller.CARREFOUR);

// Legacy adapter selectors (keeping for backward compatibility)
export const {
  selectAll: selectAllMercadonaProducts,
  selectById: selectMercadonaProductById,
  selectIds: selectMercadonaProductIds,
  selectEntities: selectMercadonaProductEntities,
  selectTotal: selectTotalMercadonaProducts,
} = productsAdapter.getSelectors(
  (state: RootStateT) => state.products[ESeller.MERCADONA],
);

export const {
  selectAll: selectAllCarrefourProducts,
  selectById: selectCarrefourProductById,
  selectIds: selectCarrefourProductIds,
  selectEntities: selectCarrefourProductEntities,
  selectTotal: selectTotalCarrefourProducts,
} = productsAdapter.getSelectors(
  (state: RootStateT) => state.products[ESeller.CARREFOUR],
);

// Generic selectors that work with any seller (improved version)
export const selectAll = (seller: ESeller) =>
  createSelector([getSellerState(seller)], sellerState =>
    sellerState ? productsAdapter.getSelectors().selectAll(sellerState) : [],
  );

export const selectById = (seller: ESeller, id: string) =>
  createSelector([getSellerState(seller)], sellerState =>
    sellerState
      ? productsAdapter.getSelectors().selectById(sellerState, id)
      : undefined,
  );

export const selectIds = (seller: ESeller) =>
  createSelector([getSellerState(seller)], sellerState =>
    sellerState ? productsAdapter.getSelectors().selectIds(sellerState) : [],
  );

export const selectEntities = (seller: ESeller) =>
  createSelector([getSellerState(seller)], sellerState =>
    sellerState
      ? productsAdapter.getSelectors().selectEntities(sellerState)
      : {},
  );

export const selectTotal = (seller: ESeller) =>
  createSelector([getSellerState(seller)], sellerState =>
    sellerState ? productsAdapter.getSelectors().selectTotal(sellerState) : 0,
  );

// Additional utility selectors
export const selectSellerCategories = (seller: ESeller) =>
  createSelector(
    [getSellerState(seller)],
    sellerState => sellerState?.categories || [],
  );
