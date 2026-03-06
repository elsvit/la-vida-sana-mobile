import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateUsers } from './types';
import { IUser } from '~/types/IUser';
import { EStateName } from '../types';
import {
  createGenericEntityAdapter,
  createEntityReducers,
} from '../helpers/entityAdapter';

// Create entity adapter for dishes
export const usersAdapter = createGenericEntityAdapter<IUser>();

const initialState: IStateUsers = {
  ...usersAdapter.getInitialState(),
};

// Create generic entity reducers
const entityReducers = createEntityReducers(usersAdapter);

export const usersSlice = createSlice({
  name: EStateName.users,
  initialState,
  reducers: {
    addUser: (state, action) => {
      entityReducers.addEntity(state, action);
    },
    updateUser: (state, action) => {
      entityReducers.upsertEntity(state, action);
    },
    removeUser: (state, action) => {
      entityReducers.removeEntity(state, action);
    },
    clearUsers: state => {
      entityReducers.clearEntities(state);
    },
  },
});

export const { addUser, updateUser, removeUser, clearUsers } = usersSlice.actions;
