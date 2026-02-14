import { ESeller } from '~/types/IProduct';
import { EGenericSeller } from '~/types/IGenericProduct';
import { IDishBE } from '~/types/IDish';

export interface IDishSB extends Omit<IDishBE, 'products'> {
  created_at: string;
  updated_at: string;
}

export interface IDishSBRow extends IDishSB {
  id: string;
  name: string;
}

export interface IDishSBInsert extends Partial<IDishSB> {
  name: string;
}

export interface IDishSBUpdate extends Partial<IDishSB> {
  name: string;
}

export interface IDatabaseDishes {
  Row: IDishSBRow;
  Insert: IDishSBInsert;
  Update: IDishSBUpdate;
}

export interface IDatabaseDishProductSB {
  dish_id: string;
  product_id: string;
  seller: ESeller | EGenericSeller;
  size?: number;
  size_format?: string;
  created_at: string;
  updated_at: string;
}
export interface IDatabaseDishProducts {
  Row: IDatabaseDishProductSB;
  Insert: IDatabaseDishProductSB;
  Update: IDatabaseDishProductSB;
}
