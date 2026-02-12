import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { Persistor } from 'redux-persist/lib/types';
import createSagaMiddleware from 'redux-saga';

import { dishesSagas , dishesSlice } from './dishes';
import { productsSagas , productsSlice } from './products';
import { genericProductsSagas , genericProductsSlice } from './genericProducts';
import { accountSagas , accountSlice } from './account';
import { usersSlice } from './users';

import { EStateName } from './types';

import { all } from 'redux-saga/effects';
import { commonSlice } from './common/slice';

// Change this import to use CommonJS require syntax for Hermes compatibility
// const createSagaMiddleware = require('redux-saga').default;

function* rootSaga() {
  yield all([
    ...dishesSagas,
    ...productsSagas,
    ...genericProductsSagas,
    ...accountSagas,
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const accountPersistConfig: PersistConfig<any> = {
  key: EStateName.account,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['lang'],
};

// Combine reducers
const rootReducer = combineReducers({
  [EStateName.common]: commonSlice.reducer,
  [EStateName.account]: persistReducer(
    accountPersistConfig,
    accountSlice.reducer,
  ),
  [EStateName.dishes]: dishesSlice.reducer,
  [EStateName.products]: productsSlice.reducer,
  [EStateName.genericProducts]: genericProductsSlice.reducer,
  [EStateName.users]: usersSlice.reducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // disable thunk because you're using saga
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(sagaMiddleware),
  devTools: __DEV__,
});

sagaMiddleware.run(rootSaga);

export const persistor: Persistor = persistStore(store);

export type RootStateT = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export default store;
