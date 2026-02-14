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

export interface IDatabaseCarrefourCategories {
  Row: ICategorySBRow;
  Insert: ICategorySBInsert;
  Update: ICategorySBUpdate;
}

export interface IDatabaseCarrefourProducts {
  Row: IProductSBResponse; // Use the response type that handles nulls
  Insert: IProductSBInsert;
  Update: IProductSBUpdate;
}

export interface IDatabaseCarrefourCategoryProducts {
  Row: ICategoryProductSBRow;
  Insert: ICategoryProductSBInsert;
  Update: ICategoryProductSBUpdate;
}
