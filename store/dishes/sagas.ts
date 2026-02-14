import { select, takeLatest } from 'redux-saga/effects';
import { fetchDishes, addDishes } from './slice';
import { supabaseService } from '~/services/supabase/supabase';
import { takeLatestWithFetchable } from '../helpers/fetchableHandler';
import { call } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { IStateDishes } from './types';
import { IDish } from '~/types/IDish';
import { RootStateT } from '../store';
import { parseSupabaseDishesToStoreFormat } from './helpers';

function* fetchDishesSaga(): Generator<any, void, any> {
  // Check if supabaseService is available
  if (!supabaseService) {
    throw new Error('Supabase service not initialized');
  }
  // Check if dishes service is available
  const dishesService = supabaseService.dishes;
  if (!dishesService) {
    throw new Error('Dishes service not found');
  }
  const [supabaseDishes, supabaseDishProducts] = yield call(
    Promise.all.bind(Promise, [
      dishesService.getDishes(),
      dishesService.getDishProducts(),
    ]),
  );
  const convertedDishes = yield call(
    parseSupabaseDishesToStoreFormat,
    supabaseDishes,
    supabaseDishProducts,
  );

  const currentState: IStateDishes = yield select(
    (state: RootStateT) => state.dishes,
  );

  const currentDishes = currentState.ids
    .map(id => currentState.entities[id])
    .filter(Boolean);
  const existingDishMap = new Map(currentDishes.map(d => [d.id, d]));

  convertedDishes.forEach((supabaseDish: IDish) => {
    existingDishMap.set(supabaseDish.id, supabaseDish);
  });

  const mergedDishes = Array.from(existingDishMap.values());

  yield put(
    addDishes({
      entities: mergedDishes,
    }),
  );
}

export default [takeLatestWithFetchable(fetchDishes, fetchDishesSaga)];
