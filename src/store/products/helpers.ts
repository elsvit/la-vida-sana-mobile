import { ESeller, IProduct } from '~/types/IProduct';

/**
 * Converts Supabase products data to the required format for the store
 */
export const parseSupabaseProductsToStoreFormat = (
  supabaseProducts: any[],
  seller: ESeller,
): IProduct[] => {
  return supabaseProducts.map(prod => ({
    id: prod.id,
    name: prod.name,
    description: prod.description,
    brand: prod.brand,
    quantity: prod.quantity || 1,
    packaging: prod.packaging,
    sizeFormat: prod.size_format,
    size: prod.size,
    udSizeFormat: prod.ud_size_format,
    udSize: prod.ud_size,
    image: prod.image,
    thumbnail: prod.thumbnail,
    images: prod.images,
    productLink: prod.product_link,
    price: prod.price,
    pricePerUnit: prod.price_per_unit,
    seller: seller,
    protein: prod.protein,
    fat: prod.fat,
    carbohydrates: prod.carbohydrates,
    calories: prod.calories,
    caloriesPer100g: prod.calories_per_100g,
    salt: prod.salt,
    sugar: prod.sugar,
    fiber: prod.fiber,
    saturatedFat: prod.saturated_fat,
    monounsaturatedFat: prod.monounsaturated_fat,
    polyunsaturatedFat: prod.polyunsaturated_fat,
    cholesterol: prod.cholesterol,
    sodium: prod.sodium,
    vitamins: prod.vitamins,
    minerals: prod.minerals,
    nutriScore: prod.nutri_score,
    totalDissolvedSolids: prod.total_dissolved_solids,
    allergens: prod.allergens,
    storageConditions: prod.storage_conditions,
    date: prod.date,
  }));
};
