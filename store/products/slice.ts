import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateProducts } from './types';
import { ESeller, IProduct, IProductCategory } from '~/types/IProduct';
import { EStateName } from '../types';
import {
  createGenericEntityAdapter,
  createEntityReducers,
} from '../helpers/entityAdapter';

// Create entity adapter for dishes
export const productsAdapter = createGenericEntityAdapter<IProduct>();

const initialState: IStateProducts = {
  [ESeller.MERCADONA]: { categories: [], ...productsAdapter.getInitialState() },
  [ESeller.CARREFOUR]: { categories: [], ...productsAdapter.getInitialState() },
};

// Create generic entity reducers
const entityReducers = createEntityReducers(productsAdapter);

export const productsSlice = createSlice({
  name: EStateName.dishes,
  initialState,
  reducers: {
    addSellerProducts: (
      state,
      action: PayloadAction<{
        seller: ESeller;
        entities: IProduct[];
        categories: IProductCategory[];
      }>,
    ) => {
      const { seller, categories, entities } = action.payload;
      switch (seller) {
        case ESeller.MERCADONA:
        case ESeller.CARREFOUR:
          // entityReducers.addEntities(state[seller], action);
          state[seller].categories = categories;
          state[seller].entities = entities.reduce((acc, entity) => {
            acc[entity.id] = entity;
            return acc;
          }, {} as Record<string, IProduct>);
          break;
        default:
          break;
      }
    },
    fetchProducts: (state, action: PayloadAction<{ seller: ESeller }>) =>
      undefined,
    fetchMercadonaProducts: () => undefined,
    fetchCarrefourProducts: () => undefined,
  },
});

export const {
  addSellerProducts,
  fetchProducts,
  fetchMercadonaProducts,
  fetchCarrefourProducts,
} = productsSlice.actions;
