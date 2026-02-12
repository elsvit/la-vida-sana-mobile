import { EntityState } from '@reduxjs/toolkit';
import { ESeller, IProduct, IProductCategory } from '../../../LaVidaSana/src/types/IProduct';

export interface IProductsSellerState extends EntityState<IProduct, string> {
  categories: IProductCategory[];
}

export interface IStateProducts {
  [ESeller.MERCADONA]: IProductsSellerState;
  [ESeller.CARREFOUR]: IProductsSellerState;
}
