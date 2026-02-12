import {
  IDatabaseDishProducts,
  IDatabaseDishes,
} from '../../../LaVidaSana/src/services/supabase/dishes/types';
import { ESeller } from '../../../LaVidaSana/src/types/IProduct';
import { EGenericSeller } from '../../../LaVidaSana/src/types/IGenericProduct';
import { ESizeFormat } from '../../../LaVidaSana/src/types/ISize';

// Helper function to convert Supabase dishes to store format
export function parseSupabaseDishesToStoreFormat(
  supabaseDishes: IDatabaseDishes['Row'][],
  supabaseDishProducts: IDatabaseDishProducts['Row'][],
) {
  return supabaseDishes.map(dish => {
    // Create a plain object to avoid any read-only property issues
    const plainDish = JSON.parse(JSON.stringify(dish));
    // Find dish products for this dish
    const dishProductRelations = supabaseDishProducts.filter(
      dp => dp.dish_id === dish.id,
    );

    // Convert to store format
    return {
      id: plainDish.id,
      name: plainDish.name,
      description: plainDish.description || undefined,
      recipe: plainDish.recipe || undefined,
      nameEn: plainDish.name_en || undefined,
      descriptionEn: plainDish.description_en || undefined,
      recipeEn: plainDish.recipe_en || undefined,
      image: plainDish.image || undefined,
      thumbnail: plainDish.thumbnail || undefined,
      difficulty: plainDish.difficulty || undefined,
      cookTime: plainDish.cook_time ?? undefined,
      prepTime: plainDish.prep_time ?? undefined,
      minPortions: plainDish.min_portions ?? undefined,
      expirationTime: plainDish.expiration_time ?? undefined,
      course: plainDish.course || undefined,
      cuisine: plainDish.cuisine || undefined,
      preparationMethod: plainDish.preparation_method || undefined,
      dietaryCategory: plainDish.dietary_category || undefined,
      mealTime: plainDish.meal_time || undefined,
      tags: plainDish.tags || [],
      orderIndex: plainDish.order_index || 0,
      rating: plainDish.rating || 0,
      isDisabled: plainDish.is_disabled || false,
      products: dishProductRelations.map(dp => {
        // Create plain object for dish product to avoid read-only property issues
        const plainDp = JSON.parse(JSON.stringify(dp));
        return {
          id: plainDp.product_id,
          seller: Object.values(ESeller).includes(plainDp.seller as ESeller)
            ? plainDp.seller
            : undefined,
          genericSeller: Object.values(EGenericSeller).includes(
            plainDp.seller as EGenericSeller,
          )
            ? plainDp.seller
            : undefined,
          size: plainDp.size || 0,
          sizeFormat: plainDp.size_format || ESizeFormat.G,
        };
      }),
    };
  });
}
