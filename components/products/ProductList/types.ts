import { ESeller } from '~/types/IProduct';
import { IProductCategory } from '~/types/IProduct';

export interface IProductList {
  seller: ESeller;
}

export interface IProductListItem {
  type: 'category' | 'product';
  data: IProductCategory | string; // Changed: string for productId, IProductCategory for category
  level: number;
  parentId?: string;
}
