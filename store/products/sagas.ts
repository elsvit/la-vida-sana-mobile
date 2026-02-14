import {
  fetchMercadonaProducts,
  fetchCarrefourProducts,
  addSellerProducts,
  fetchProducts,
} from './slice';
import { supabaseService } from '~/services/supabase/supabase';
import { takeLatestWithFetchable } from '../helpers/fetchableHandler';
import { call } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { parseSupabaseProductsToStoreFormat } from './helpers';
import { ESeller } from '~/types/IProduct';
import { IProductCategory } from '~/types/IProduct';

function* fetchSellerProductsSaga(
  seller: ESeller,
): Generator<any, { products: any[]; categories: IProductCategory[] }, any> {
  if (!supabaseService) {
    throw new Error('Supabase service not initialized');
  }
  let service;
  switch (seller) {
    case ESeller.MERCADONA:
      service = supabaseService.mercadona;
      break;
    case ESeller.CARREFOUR:
      service = supabaseService.carrefour;
      break;
    default:
      throw new Error(`Service for ${seller} not found`);
  }

  const [supabaseCategories, supabaseProducts, supabaseCategoryProducts] =
    yield call(
      Promise.all.bind(Promise, [
        service.getCategories(),
        service.getProducts(),
        service.getCategoryProducts(),
      ]),
    );

  const convertedProducts = parseSupabaseProductsToStoreFormat(
    supabaseProducts,
    seller,
  );

  const plainConvertedCategories: IProductCategory[] = supabaseCategories?.map(
    (cat: any) => ({
      id: cat.id,
      name: cat.name,
      productIds: supabaseCategoryProducts
        ?.filter((rel: any) => rel.category_id === cat.id)
        .map((rel: any) => rel.product_id),
      categories: [],
      isNotFood: cat.is_not_food || false,
      parentId: cat.parent_id,
      orderIndex: cat.order_index,
    }),
  );

  const convertedCategories: IProductCategory[] = plainConvertedCategories
    .filter((cat: any) => !cat.parentId)
    .map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      productIds: cat.productIds,
      categories: plainConvertedCategories
        .filter((c: any) => c.parentId === cat.id)
        .sort((a: any, b: any) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        ),
      isNotFood: cat.isNotFood,
    }))
    .sort((a: any, b: any) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    );

  return {
    products: convertedProducts,
    categories: convertedCategories,
  };
}

function* fetchProductsSaga(seller: ESeller): Generator<any, void, any> {
  const { products, categories } = yield call(fetchSellerProductsSaga, seller);
  if (products?.length && categories?.length) {
    yield put(addSellerProducts({ seller, entities: products, categories }));
  }
}

function* fetchMercadonaProductsSaga(): Generator<any, void, any> {
  const { products, categories } = yield call(
    fetchSellerProductsSaga,
    ESeller.MERCADONA,
  );
  if (products?.length && categories?.length) {
    yield put(
      addSellerProducts({
        seller: ESeller.MERCADONA,
        entities: products,
        categories,
      }),
    );
  }
}

function* fetchCarrefourProductsSaga(): Generator<any, void, any> {
  const { products, categories } = yield call(
    fetchSellerProductsSaga,
    ESeller.CARREFOUR,
  );
  if (products?.length && categories?.length) {
    yield put(
      addSellerProducts({
        seller: ESeller.CARREFOUR,
        entities: products,
        categories,
      }),
    );
  }
}

export default [
  takeLatestWithFetchable(fetchProducts, fetchProductsSaga),
  takeLatestWithFetchable(fetchMercadonaProducts, fetchMercadonaProductsSaga),
  takeLatestWithFetchable(fetchCarrefourProducts, fetchCarrefourProductsSaga),
];
