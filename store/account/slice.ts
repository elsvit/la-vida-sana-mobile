import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ELang } from '~/types/ILang';
import { ERole, IStateAccount } from './types';
// import { IUser } from '~/types/IUser';
import { EStateName } from '../types';
// import { RootStateT } from '../store';
// import {
//   createGenericEntityAdapter,
//   createEntityReducers,
// } from '../helpers/entityAdapter';

// Create entity adapter for users
// const usersAdapter = createGenericEntityAdapter<IUser>((a, b) =>
//   a.createdAt.localeCompare(b.createdAt),
// );

const initialState: IStateAccount = {
  role: ERole.admin,
  lang: null,
  isLangInitiating: true, // Change from null to true
  // users: usersAdapter.getInitialState(),
};

// Create generic entity reducers
// const entityReducers = createEntityReducers(usersAdapter);

export const accountSlice = createSlice({
  name: EStateName.account,
  initialState,
  reducers: {
    initLanguage: state => {
      state.isLangInitiating = true;
    },
    setLanguage: (state, action: PayloadAction<ELang>) => {
      state.lang = action.payload;
      state.isLangInitiating = false; // Set to false when language is set
    },
    setRole: (state, action: PayloadAction<ERole>) => {
      state.role = action.payload;
    },
    // Use generic entity reducers
    // addUser: (state, action) => {
    //   entityReducers.addEntity(state.users, action);
    // },
    // addUsers: (state, action) => {
    //   entityReducers.addEntities(state.users, action);
    // },
    // removeUser: (state, action) => {
    //   entityReducers.removeEntity(state.users, action);
    // },
    // removeUsers: (state, action) => {
    //   entityReducers.removeEntities(state.users, action);
    // },
    // updateUser: (state, action) => {
    //   entityReducers.updateEntity(state.users, action);
    // },
    // updateUsers: (state, action) => {
    //   entityReducers.updateEntities(state.users, action);
    // },
    // upsertUser: (state, action) => {
    //   entityReducers.upsertEntity(state.users, action);
    // },
    // upsertUsers: (state, action) => {
    //   entityReducers.upsertEntities(state.users, action);
    // },
    // clearUsers: state => {
    //   entityReducers.clearEntities(state.users);
    // },
  },
});

// Export actions
export const {
  initLanguage,
  setLanguage,
  setRole,
  // addUser,
  // addUsers,
  // removeUser,
  // removeUsers,
  // updateUser,
  // updateUsers,
  // upsertUser,
  // upsertUsers,
  // clearUsers,
} = accountSlice.actions;

// Export the adapter for use in selectors
// export { usersAdapter };
