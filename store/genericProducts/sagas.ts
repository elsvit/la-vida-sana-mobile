import { addGenericProducts, fetchGenericProducts } from './slice';
import { IStateGenericProducts } from './types';
import { RootStateT } from '../store';
import { supabaseService } from '~/services/supabase/supabase';
import { takeLatestWithFetchable } from '../helpers/fetchableHandler';
import { call, select } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import {
  parseSupabaseGenericProductsToStoreFormat,
  parseSupabaseGenericCategoriesToStoreFormat,
} from './helpers';
import { IGenericProduct } from '~/types/IGenericProduct';

function* fetchGenericProductsSaga(): Generator<any, void, any> {
  if (!supabaseService) {
    throw new Error('Supabase genericProducts service not initialized');
  }
  const service = supabaseService.genericProducts;

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
    (state: RootStateT) => state.genericProducts,
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
