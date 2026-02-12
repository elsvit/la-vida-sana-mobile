import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateGenericProducts } from './types';
import {
  IGenericProduct,
  IGenericProductCategory,
} from '../../../LaVidaSana/src/types/IGenericProduct';
import { EStateName } from '../types';
import {
  createGenericEntityAdapter,
  createEntityReducers,
} from '../helpers/entityAdapter';

// Create entity adapter for dishes
export const genericProductsAdapter =
  createGenericEntityAdapter<IGenericProduct>();

const initialState: IStateGenericProducts = {
  categories: [],
  ...genericProductsAdapter.getInitialState(),
};

// Create generic entity reducers
const entityReducers = createEntityReducers(genericProductsAdapter);

export const genericProductsSlice = createSlice({
  name: EStateName.dishes,
  initialState,
  reducers: {
    fetchGenericProducts: () => undefined,
    addGenericProducts: (
      state,
      action: PayloadAction<{
        entities: IGenericProduct[];
        categories: IGenericProductCategory[];
      }>,
    ) => {
      const { categories, entities } = action.payload;
      state.categories = categories;
      state.entities = entities.reduce((acc, entity) => {
        acc[entity.id] = entity;
        return acc;
      }, {} as Record<string, IGenericProduct>);
    },
  },
});

export const { fetchGenericProducts, addGenericProducts } =
  genericProductsSlice.actions;
