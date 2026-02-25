import { ESeller } from '~/types/IProduct';
import { IProductCategory } from '~/types/IProduct';

export interface IGenericProductList {
  seller: ESeller;
}

export interface IGenericProductListItem {
  type: 'category' | 'product';
  data: IProductCategory | string; // Changed: string for productId, IProductCategory for category
  level: number;
  parentId?: string;
}
