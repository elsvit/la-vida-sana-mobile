import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStateUsers, RemoveUserPayload } from './types';
import { IUser } from '~/types/IUser';
import { EStateName } from '../types';
import {
  createGenericEntityAdapter,
  createEntityReducers,
} from '../helpers/entityAdapter';
import { AddUserPayload, UpdateUserPayload } from './types';

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
    addUser: (state, action: PayloadAction<AddUserPayload>) => {
      entityReducers.addEntity(state, action);
    },
    addUserSuccess: (state, action: PayloadAction<IUser>) => {
      entityReducers.addEntity(state, {
        ...action,
        // entityReducers.addEntity expects payload in shape { entity: IUser }
        payload: { entity: action.payload },
      });
    },
    updateUser: (state, action: PayloadAction<AddUserPayload>) => {
      entityReducers.upsertEntity(state, { ...action, payload: action.payload.entity, });
    },
    updateUserSuccess: (state, action: PayloadAction<IUser>) => {
      // entityReducers.upsertEntity expects payload to be the entity itself
      entityReducers.upsertEntity(state, action as unknown as PayloadAction<IUser>);
    },
    removeUser: (state, action: PayloadAction<RemoveUserPayload>) => {
      entityReducers.removeEntity(state, { ...action, payload: action.payload.entity, });
    },
    removeUserSuccess: (state, action: PayloadAction<string>) => {
      // entityReducers.removeEntity expects payload to be the entity id (string)
      entityReducers.removeEntity(state, action as unknown as PayloadAction<string>);
    },
    clearUsers: state => {
      entityReducers.clearEntities(state);
    },
  },
});

export const {
  addUser,
  addUserSuccess,
  updateUser,
  updateUserSuccess,
  removeUser,
  removeUserSuccess,
  clearUsers,
} = usersSlice.actions;
