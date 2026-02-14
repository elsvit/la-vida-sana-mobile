import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateDishes } from './types';
import { IDish } from '~/types/IDish';
import { EStateName } from '../types';
import {
  createGenericEntityAdapter,
  createEntityReducers,
} from '../helpers/entityAdapter';

// Create entity adapter for dishes
export const dishesAdapter = createGenericEntityAdapter<IDish>();

const initialState: IStateDishes = {
  ...dishesAdapter.getInitialState(),
};

// Create generic entity reducers
const entityReducers = createEntityReducers(dishesAdapter);

export const dishesSlice = createSlice({
  name: EStateName.dishes,
  initialState,
  reducers: {
    fetchDishes: () => undefined,
    addDishes: (state, action) => {
      entityReducers.addEntities(state, action);
    },
    // addDish: (state, action) => {
    //   entityReducers.addEntity(state.dishes, action);
    // },
    // removeDish: (state, action) => {
    //   entityReducers.removeEntity(state.dishes, action);
    // },
    // removeDishes: (state, action) => {
    //   entityReducers.removeEntities(state.dishes, action);
    // },
    // updateDish: (state, action) => {
    //   entityReducers.updateEntity(state.dishes, action);
    // },
    // updateDishes: (state, action) => {
    //   entityReducers.updateEntities(state.dishes, action);
    // },
    // upsertDish: (state, action) => {
    //   entityReducers.upsertEntity(state.dishes, action);
    // },
    // clearDishes: (state) => {
    //   entityReducers.clearEntities(state.dishes);
    // },
  },
});

export const { fetchDishes, addDishes } = dishesSlice.actions;
