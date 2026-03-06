import {
  ICategoryProductSBInsert,
  ICategoryProductSBRow,
  ICategoryProductSBUpdate,
  ICategorySBRow,
  ICategorySBInsert,
  ICategorySBUpdate,
  IGenericProductSB,
} from '../types';

export interface IDatabaseGenericCategories {
  Row: ICategorySBRow;
  Insert: ICategorySBInsert;
  Update: ICategorySBUpdate;
}

export interface IDatabaseGenericProduct {
  Row: IGenericProductSB;
  Insert: IGenericProductSB;
  Update: IGenericProductSB;
}

export interface IDatabaseGenericProducts {
  Row: IGenericProductSB;
  Insert: Partial<IGenericProductSB> & {
    name: string;
    size_format: string;
  };
  Update: Partial<IGenericProductSB>;
}

export interface IDatabaseGenericProductMatching {
  Row: {
    generic_product_id: string;
    seller: string;
    seller_product_id: string;
    created_at?: string;
    updated_at?: string;
  };
  Insert: {
    generic_product_id: string;
    seller: string;
    seller_product_id: string;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    generic_product_id?: string;
    seller?: string;
    seller_product_id?: string;
    created_at?: string;
    updated_at?: string;
  };
}

export interface IDatabaseGenericCategoryProducts {
  Row: ICategoryProductSBRow;
  Insert: ICategoryProductSBInsert;
  Update: ICategoryProductSBUpdate;
}
