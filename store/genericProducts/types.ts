import { EntityState } from '@reduxjs/toolkit';
import {
  IGenericProduct,
  IGenericProductCategory,
} from '../../../LaVidaSana/src/types/IGenericProduct';

export interface IStateGenericProducts
  extends EntityState<IGenericProduct, string> {
  categories: IGenericProductCategory[];
}
