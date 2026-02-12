import { ESeller } from './IProduct';

export enum EGenericSeller {
  GENERIC_PRODUCTS = 'genericProducts',
}

export enum EGenericProductsTypes {
  CATEGORY = 'category',
  PRODUCT = 'product',
}

export interface IGenericMatchingProduct {
  seller: ESeller | EGenericSeller; // Allow both seller types
  id: string;
}

export interface IGenericProduct {
  id: string;
  name: string;
  description?: string;
  nameEn?: string;
  descriptionEn?: string;
  sizeFormat: string; // Make it required, not optional
  image?: string;
  thumbnail?: string;
  matchingProducts?: IGenericMatchingProduct[]; // Change back to the correct type
}

export interface IGenericProductCategory {
  id: string;
  name: string;
  nameEn?: string;
  genericProductIds?: string[]; // generic products ids
  isNotFood?: boolean;
}

export interface IGenericProductCopy {
  seller: ESeller; // Change from EGenericSeller to ESeller
  productId: string;
}
