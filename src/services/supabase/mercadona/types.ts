import {
  ICategoryProductSBInsert,
  ICategoryProductSBRow,
  ICategoryProductSBUpdate,
  IProductSBInsert,
  IProductSBRow,
  IProductSBUpdate,
  IProductSBResponse,
  ICategorySBRow,
  ICategorySBInsert,
  ICategorySBUpdate,
} from '../types';

export interface IDatabaseMercadonaCategories {
  Row: ICategorySBRow;
  Insert: ICategorySBInsert;
  Update: ICategorySBUpdate;
}

export interface IDatabaseMercadonaProducts {
  Row: IProductSBResponse; // Use the response type that handles nulls
  Insert: IProductSBInsert;
  Update: IProductSBUpdate;
}

export interface IDatabaseMercadonaCategoryProducts {
  Row: ICategoryProductSBRow;
  Insert: ICategoryProductSBInsert;
  Update: ICategoryProductSBUpdate;
}
