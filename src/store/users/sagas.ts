import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';

import { takeLatestWithFetchable } from '../helpers/fetchableHandler';
import {
  addUser,
  addUserSuccess,
  removeUser,
  removeUserSuccess,
  updateUser,
  updateUserSuccess,
} from './slice';
import { AddUserPayload, RemoveUserPayload, UpdateUserPayload } from './types';

function* addUserSaga(action: PayloadAction<AddUserPayload>) {
  const { entity, onSuccess } = action.payload;

  // Immediately reflect entity in the store
  yield put(addUserSuccess(entity));

  if (onSuccess) {
    yield call(onSuccess);
  }
}

function* updateUserSaga(action: PayloadAction<UpdateUserPayload>) {
  const { entity, onSuccess } = action.payload;

  // Upsert user into the store
  yield put(updateUserSuccess(entity));

  if (onSuccess) {
    yield call(onSuccess);
  }
}

function* removeUserSaga(action: PayloadAction<RemoveUserPayload>) {
  const { entity, onSuccess } = action.payload;

  // Remove user by id from the store
  yield put(removeUserSuccess(entity));

  if (onSuccess) {
    yield call(onSuccess);
  }
}

export default [
  takeLatestWithFetchable(addUser, addUserSaga),
  takeLatestWithFetchable(updateUser, updateUserSaga),
  takeLatestWithFetchable(removeUser, removeUserSaga),
];
