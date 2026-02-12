import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ECommonActions,
  IErrorPayload,
  IStateCommon,
  IActionTypePayload,
} from './types';
import { EStateName } from '../types';

const initialState: IStateCommon = {
  [ECommonActions.LOADING]: {},
  [ECommonActions.LOADED]: {},
  [ECommonActions.ERROR]: {},
};

export const commonSlice = createSlice({
  name: EStateName.dishes,
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<IActionTypePayload>) => {
      state[ECommonActions.LOADING][action.payload.actionType] = true;
      state[ECommonActions.LOADED][action.payload.actionType] = false;
      state[ECommonActions.ERROR][action.payload.actionType] = null;
    },
    setLoaded: (state, action: PayloadAction<IActionTypePayload>) => {
      state[ECommonActions.LOADED][action.payload.actionType] = true;
      state[ECommonActions.LOADING][action.payload.actionType] = false;
      state[ECommonActions.ERROR][action.payload.actionType] = null;
    },
    setError: (state, action: PayloadAction<IErrorPayload>) => {
      state[ECommonActions.ERROR][action.payload.actionType] =
        action.payload.error;
      state[ECommonActions.LOADING][action.payload.actionType] = false;
      state[ECommonActions.LOADED][action.payload.actionType] = false;
    },
    setReset: (state, action: PayloadAction<IActionTypePayload>) => {
      state[ECommonActions.LOADING][action.payload.actionType] = undefined;
      state[ECommonActions.LOADED][action.payload.actionType] = undefined;
      state[ECommonActions.ERROR][action.payload.actionType] = undefined;
    },
    setResetAll: () => initialState,
  },
});

export const { setLoading, setLoaded, setError, setReset, setResetAll } =
  commonSlice.actions;
