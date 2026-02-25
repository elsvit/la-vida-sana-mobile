// store/index.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { Persistor } from 'redux-persist/lib/types';
import logger from 'redux-logger';

import { getStorage } from '~/services/storage/storage';
import { accountSagas, accountSlice, IStateAccount } from './account';
import { cartSlice, IStateCart } from './cart';
import { dishesSagas, dishesSlice } from './dishes';
import { productsSagas, productsSlice } from './products';
import { genericProductsSagas, genericProductsSlice } from './genericProducts';
import { usersSlice } from './users';
import { commonSlice } from './common/slice';
import { EStateName } from './types';
import { IS_WEB } from '~/constants';

// Root saga
function* rootSaga() {
  yield all([
    ...dishesSagas,
    ...productsSagas,
    ...genericProductsSagas,
    ...accountSagas,
  ]);
}

// Storage selection
const storage = getStorage()

// Persist configs
const accountPersistConfig: PersistConfig<IStateAccount> = {
  key: EStateName.account,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['lang'],
};

const cartPersistConfig: PersistConfig<IStateCart> = {
  key: EStateName.cart,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['items'],
};

// Combine reducers
const accountReducer = IS_WEB
  ? accountSlice.reducer
  : persistReducer<IStateAccount>(accountPersistConfig, accountSlice.reducer);

const cartReducer = IS_WEB
  ? cartSlice.reducer
  : persistReducer<IStateCart>(cartPersistConfig, cartSlice.reducer);

const rootReducer = combineReducers({
  [EStateName.common]: commonSlice.reducer,
  [EStateName.account]: accountReducer,
  [EStateName.dishes]: dishesSlice.reducer,
  [EStateName.products]: productsSlice.reducer,
  [EStateName.genericProducts]: genericProductsSlice.reducer,
  [EStateName.users]: usersSlice.reducer,
  [EStateName.cart]: cartReducer,
});

// Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store once
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
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
    }).concat(__DEV__ ? [sagaMiddleware, logger] : [sagaMiddleware]),
  devTools: __DEV__,
});

sagaMiddleware.run(rootSaga);

// export const persistor: Persistor = persistStore(store);
export const persistor: Persistor | null = IS_WEB ? null : persistStore(store);

// Types
export type RootStateT = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
