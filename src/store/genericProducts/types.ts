import { EntityState } from '@reduxjs/toolkit';
import {
  IGenericProduct,
  IGenericProductCategory,
} from '~/types/IGenericProduct';

export interface IStateGenericProducts
  extends EntityState<IGenericProduct, string> {
  categories: IGenericProductCategory[];
}
