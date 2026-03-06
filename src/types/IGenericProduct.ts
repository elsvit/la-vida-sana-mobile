import { ESeller } from './IProduct';
import { EAllergen, EMineral, EVitamin } from '~/types/IElement';

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
  calories?: number | null; // per 100g or 100ml
  protein?: number | null; // per 100g or 100ml
  fat?: number | null;
  carbohydrates?: number | null;
  salt?: number | null;
  sugar?: number | null;
  fiber?: number | null;
  saturatedFat?: number | null;
  monounsaturatedFat?: number | null;
  polyunsaturatedFat?: number | null;
  cholesterol?: number | null;
  sodium?: number | null;
  vitamins?: EVitamin[] | null;
  minerals?: EMineral[] | null;
  nutriScore?: string | null;
  totalDissolvedSolids?: number | null;
  allergens?: EAllergen[] | null;
  storageConditions?: string | null;
  rate?: number | null;
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
