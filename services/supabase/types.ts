import { ESeller, IProduct } from '~/types/IProduct';
import {
  IDatabaseMercadonaCategories,
  IDatabaseMercadonaProducts,
  IDatabaseMercadonaCategoryProducts,
} from './mercadona/types';
import {
  IDatabaseCarrefourCategories,
  IDatabaseCarrefourCategoryProducts,
  IDatabaseCarrefourProducts,
} from './carrefour/types';
import {
  IDatabaseGenericCategories,
  IDatabaseGenericCategoryProducts,
  IDatabaseGenericProductMatching,
  IDatabaseGenericProducts,
} from './genericProducts/types';
import { IDatabaseDishProducts, IDatabaseDishes } from './dishes/types';
import { IDishBE } from '~/types/IDish';

export interface ICategorySBBase {
  id: string;
  parent_id: string | null;
  order_index: number;
  is_not_food: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICategorySBRow extends ICategorySBBase {
  name: string;
}

export interface ICategorySBInsert extends Partial<ICategorySBBase> {
  name: string;
}

export interface ICategorySBUpdate extends Partial<ICategorySBBase> {
  name: string;
}

export interface IProductSB extends IProduct {
  created_at: string;
  updated_at: string;
}

// Database row type - what Supabase actually returns
export interface IProductSBRow extends IProductSB {
  id: string;
  name: string;
}

// Database insert type - what you send to Supabase
export interface IProductSBInsert extends Partial<IProductSB> {
  name: string;
}

// Database update type - what you send for updates
export interface IProductSBUpdate extends Partial<IProductSB> {
  name?: string;
}

// Database response type - handles null values from database
export interface IProductSBResponse {
  id: string;
  name: string;
  description: string | null;
  brand: string | null;
  quantity: number | null;
  packaging: string | null;
  size_format: string | null;
  size: number | null;
  image: string | null;
  thumbnail: string | null;
  images: string[] | null;
  product_link: string | null;
  price: number | null;
  price_per_unit: number | null;
  seller: string | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  calories: number | null;
  calories_per_100g: number | null;
  salt: number | null;
  sugar: number | null;
  fiber: number | null;
  saturated_fat: number | null;
  monounsaturated_fat: number | null;
  polyunsaturated_fat: number | null;
  cholesterol: number | null;
  sodium: number | null;
  vitamins: string[] | null;
  minerals: string[] | null;
  nutri_score: string | null;
  total_dissolved_solids: number | null;
  allergens: string[] | null;
  storage_conditions: string | null;
  date: string | null;
  is_disabled: boolean | null;
  category_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ICategoryProductSBRow {
  category_id: string;
  product_id: string;
}

export interface ICategoryProductSBInsert {
  category_id: string;
  product_id: string;
}

export interface ICategoryProductSBUpdate {
  category_id?: string;
  product_id?: string;
}

export interface IGenericProductSB {
  id: string;
  name: string;
  description?: string;
  size_format: string;
  image?: string;
  thumbnail?: string;
  created_at: string;
  updated_at: string;
}

export interface IDishSB extends IDishBE {
  created_at?: string;
  updated_at?: string;
}

export interface IPricesSB {
  date: string;
  seller: ESeller;
  total_products: number;
  prices: {
    [key: string]: number; // productId: price
  };
  created_at?: string;
  updated_at?: string;
}

// Add proper Row, Insert, and Update types for prices
export interface IPricesSBRow extends IPricesSB {
  date: string;
  seller: ESeller;
  total_products: number;
  prices: {
    [key: string]: number;
  };
  created_at: string;
  updated_at: string;
}

export interface IPricesSBInsert extends Partial<IPricesSB> {
  date: string;
  seller: ESeller;
  total_products: number;
  prices: {
    [key: string]: number;
  };
}

export interface IPricesSBUpdate extends Partial<IPricesSB> {
  date?: string;
  seller?: ESeller;
  total_products?: number;
  prices?: {
    [key: string]: number;
  };
}

// Database types - you can generate these from your Supabase dashboard
export interface Database {
  public: {
    Tables: {
      // ESeller.Mercadona Tables
      mercadona_categories: IDatabaseMercadonaCategories;
      mercadona_products: IDatabaseMercadonaProducts;
      mercadona_category_products: IDatabaseMercadonaCategoryProducts;

      // Carrefour Tables (same structure as Mercadona)
      carrefour_categories: IDatabaseCarrefourCategories;
      carrefour_products: IDatabaseCarrefourProducts;
      carrefour_category_products: IDatabaseCarrefourCategoryProducts;

      // Generic Products Tables
      generic_categories: IDatabaseGenericCategories;
      generic_products: IDatabaseGenericProducts;
      generic_product_matching: IDatabaseGenericProductMatching;
      generic_category_products: IDatabaseGenericCategoryProducts;

      // Dishes Tables - remove the category-related tables
      dishes: IDatabaseDishes;
      dish_products: IDatabaseDishProducts;

      // Prices Tables - fix the structure
      prices: {
        Row: IPricesSBRow;
        Insert: IPricesSBInsert;
        Update: IPricesSBUpdate;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
