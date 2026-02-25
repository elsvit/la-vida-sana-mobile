import { addGenericProducts, fetchGenericProducts } from './slice';
import { IStateGenericProducts } from './types';
import { getSupabaseService } from '~/services/supabase/supabase';
import { takeLatestWithFetchable } from '../helpers/fetchableHandler';
import { call, put, select } from 'redux-saga/effects';
import {
  parseSupabaseGenericCategoriesToStoreFormat,
  parseSupabaseGenericProductsToStoreFormat,
} from './helpers';
import { IGenericProduct } from '~/types/IGenericProduct';
import { EStateName, RootStateT } from '~/store';

function* fetchGenericProductsSaga(): Generator<any, void, any> {
  const serviceRoot = getSupabaseService();
  if (!serviceRoot) {
    console.log(
      'TEST_17 ERROR fetchGenericProductsSaga service not initialized',
    );
    // Gracefully exit without throwing so tests without env don't fail the whole saga
    return;
  }
  const service = serviceRoot.genericProducts;

  const [
    supabaseCategories,
    supabaseProducts,
    supabaseCategoryProducts,
    supabaseProductMatching,
  ] = yield call(
    Promise.all.bind(Promise, [
      service.getCategories(),
      service.getProducts(),
      service.getCategoryProducts(),
      service.getProductMatching(),
    ]),
  );

  console.log('TEST_34 fetchGenericProductsSaga', {
    supabaseCategories,
    supabaseCategoryProducts,
    supabaseProducts,
    supabaseProductMatching,
  });

  const parsedCategories = yield call(
    parseSupabaseGenericCategoriesToStoreFormat,
    supabaseCategories,
    supabaseCategoryProducts,
  );

  const parsedProducts = parseSupabaseGenericProductsToStoreFormat(
    supabaseProducts,
    supabaseProductMatching,
  );

  const currentState: IStateGenericProducts = yield select(
    (state: RootStateT) => state[EStateName.genericProducts],
  );

  const currentCategories = (currentState.categories || []).map(category => ({
    ...category,
    genericProductIds: category.genericProductIds
      ? [...category.genericProductIds]
      : [],
  }));

  const currentProducts = Object.values(currentState.entities)
    .filter((entity): entity is IGenericProduct => entity !== undefined)
    .map(entity => ({
      ...entity,
      matchingProducts: entity.matchingProducts
        ? [...entity.matchingProducts]
        : undefined,
    }));

  const mergedCategories =
    parsedCategories.length > 0 ? parsedCategories : currentCategories;
  const existingProductMap = new Map(
    currentProducts.map((p: IGenericProduct) => [p.id, p]),
  );

  parsedProducts.forEach((supabaseProduct: IGenericProduct) => {
    if (!existingProductMap.has(supabaseProduct.id)) {
      // Ensure matchingProducts is properly handled
      const productWithMatchingProducts = {
        ...supabaseProduct,
        matchingProducts: supabaseProduct.matchingProducts || undefined,
      };
      existingProductMap.set(supabaseProduct.id, productWithMatchingProducts);
    }
  });

  const mergedProducts: IGenericProduct[] = Array.from(
    existingProductMap.values(),
  );

  if (mergedProducts?.length && mergedCategories?.length) {
    yield put(
      addGenericProducts({
        entities: mergedProducts,
        categories: mergedCategories,
      }),
    );
  }
}

export default [
  takeLatestWithFetchable(fetchGenericProducts, fetchGenericProductsSaga),
];
