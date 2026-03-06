import { ESeller } from './IProduct';
import { EGenericSeller } from './IGenericProduct';
import { ESizeFormat } from './ISize';

export enum EDishesTypes {
  DISH = 'dish',
}

export enum ECuisine {
  SPANISH = 'spanish',
  ITALIAN = 'italian',
  CHINESE = 'chinese',
  FRENCH = 'french',
  MEXICAN = 'mexican',
  UKRAINIAN = 'ukrainian',
  INDIAN = 'indian',
  JAPANESE = 'japanese',
  AMERICAN = 'american',
  OTHER = 'other',
}

export enum EPreparationMethod {
  GRILLED = 'grilled',
  FRIED = 'fried',
  BAKED = 'baked',
  STEAMED = 'steamed',
  BOILED = 'boiled',
  RAW = 'raw',
  OTHER = 'other',
}

export enum EDietaryCategory {
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
  GLUTEN_FREE = 'gluten-free',
  KETO = 'keto',
  LOW_CARB = 'low-carb',
  OTHER = 'other',
}

export enum ECourse {
  APPETIZERS = 'appetizers',
  SOUPS = 'soups',
  SALADS = 'salads',
  MAIN_COURSES = 'main-courses',
  SIDE_DISHES = 'side-dishes',
  DESSERTS = 'desserts',
  BEVERAGES = 'beverages',
  OTHER = 'other',
}

export enum EMealTime {
  BREAKFAST = 'breakfast',
  BRUNCH = 'brunch',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACKS = 'snacks',
  LATE_NIGHT = 'late-night',
  OTHER = 'other',
}

export enum EDishDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  OTHER = 'other',
}

export interface IDishProduct {
  genericSeller?: EGenericSeller;
  seller?: ESeller;
  id: string;
  size: number;
  sizeFormat: ESizeFormat;
}

export interface IDish {
  id: string;
  name: string;
  description?: string;
  recipe?: string;
  nameEn?: string;
  descriptionEn?: string;
  recipeEn?: string;
  products: IDishProduct[];
  image?: string;
  thumbnail?: string;
  course?: ECourse;
  cuisine?: ECuisine;
  preparationMethod?: EPreparationMethod;
  dietaryCategory?: EDietaryCategory;
  difficulty?: EDishDifficulty;
  mealTime?: EMealTime; // e.g. breakfast, lunch, dinner, snack, late-night
  prepTime?: number; // in hours
  cookTime?: number; // in hours cooking_time
  minPortions?: number; // minimum number of dishes to be made
  expirationTime?: number; // in hours
  tags?: string[];
  orderIndex?: number;
  rating?: number; // 0-5
  isDisabled?: boolean;
}

// Snake Case for SupaBase on BE server
export interface IDishBE {
  id: string;
  name: string;
  description?: string;
  recipe?: string;
  name_en?: string;
  description_en?: string;
  recipe_en?: string;
  products: IDishProduct[];
  image?: string;
  thumbnail?: string;
  course?: ECourse;
  cuisine?: ECuisine;
  preparation_method?: EPreparationMethod;
  dietary_category?: EDietaryCategory;
  difficulty?: EDishDifficulty;
  meal_time?: EMealTime; // e.g. breakfast, lunch, dinner, snack, late-night
  prep_time?: number; // in minutes
  cook_time?: number; // in minutes cooking_time
  min_portions?: number; // minimum number of dishes to be made
  expiration_time?: number; // in hours
  tags?: string[];
  order_index?: number;
  rating?: number; // 0-5
  is_disabled?: boolean;
}
