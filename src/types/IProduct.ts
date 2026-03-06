import { EAllergen, EMineral, EVitamin } from './IElement';
import { EGenericSeller } from './IGenericProduct';
import { ESizeFormat, EUdSizeFormat } from './ISize';

export enum ESeller {
  MERCADONA = 'mercadona',
  CARREFOUR = 'carrefour',
  ANOTHER_SELLER = 'anotherSeller',
}

export enum EProductsType {
  CATEGORY = 'category',
  PRODUCT = 'product',
}

export enum EPackaging {
  // TODO check if needed
  BOTELLA = 'Botella',
  GARRAFA = 'Garrafa',
  PAQUETE = 'Paquete',
}

export interface IProductCategory {
  id: string;
  name?: string;
  categories?: IProductCategory[];
  productIds?: string[]; // productIds[]
  isNotFood?: boolean;
}

export interface IProduct {
  id: string;
  name: string;
  description?: string | null;
  brand?: string | null;
  quantity: number;
  packaging?: string | null;
  sizeFormat?: ESizeFormat | null;
  size?: number | null;
  udSizeFormat?: EUdSizeFormat | null;
  udSize?: number | null;
  image?: string | null;
  thumbnail?: string | null;
  images?: string[] | null;
  productLink?: string | null;
  price?: number | null;
  pricePerUnit?: number | null;
  seller?: string | null;
  protein?: number | null;
  fat?: number | null;
  carbohydrates?: number | null;
  calories?: number | null;
  caloriesPer100g?: number | null;
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
  rate?: number; // TODO add logic and to supabase
  isDisabled?: boolean | null;
  date?: string | null;
}

// ICategoryAdd, ICategoryEdit, ICategoryProductAdd, IProductEdit, IProductCopy, IProductRemove
export interface ICategoryAdd {
  seller: ESeller;
  categoryId?: string;
}

export interface ICategoryEdit {
  seller: ESeller;
  categoryId: string;
  subcategoryId?: string;
}

export interface ICategoryProductAdd {
  seller: ESeller;
  categoryId: string;
  subcategoryId?: string;
}

export interface IProductEdit {
  seller: ESeller;
  categoryId: string;
  subcategoryId?: string;
  productId: string;
}

export interface ICategoryProductCopy {
  seller: ESeller;
  categoryId: string;
  subcategoryId?: string;
}

export interface ICategoryRefresh {
  // TODO add seller
  categoryId: number;
}

export interface IProductCopy {
  seller: ESeller;
  productId: string;
}

export interface IProductRemove {
  seller: ESeller;
  categoryId?: string;
  subcategoryId?: string;
  productId: string;
}

export interface ISellerAndProductId {
  sellerOrGenericSeller: ESeller | EGenericSeller;
  productId: string;
}
