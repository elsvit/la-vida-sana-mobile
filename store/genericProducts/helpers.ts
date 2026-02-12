import { IGenericProduct } from '../../../LaVidaSana/src/types/IGenericProduct';
import { ESizeFormat } from '../../../LaVidaSana/src/types/ISize';

/**
 * Converts Supabase generic products data to the required format for the store
 */
export const parseSupabaseGenericProductsToStoreFormat = (
  supabaseProducts: any[],
  supabaseProductMatching: any[],
): IGenericProduct[] => {
  return supabaseProducts.map(product => {
    const matchingProducts = supabaseProductMatching
      .filter((match: any) => match.generic_product_id === product.id)
      .map((match: any) => ({
        seller: match.seller,
        id: match.seller_product_id,
      }));

    return {
      id: product.id,
      name: product.name,
      description: product.description || undefined,
      nameEn: product.name_en,
      descriptionEn: product.description_en,
      sizeFormat: product.size_format || ESizeFormat.G,
      image: product.image || undefined,
      thumbnail: product.thumbnail || undefined,
      matchingProducts,
    };
  });
};

export const parseSupabaseGenericCategoriesToStoreFormat = (
  supabaseCategories: any[],
  supabaseCategoryProducts: any[],
) => {
  return supabaseCategories.map(cat => {
    // Find all relationships for this category
    const categoryRelationships = supabaseCategoryProducts.filter(
      (rel: any) => rel.category_id === cat.id,
    );

    // Extract product IDs from relationships
    const productIds = categoryRelationships.map((rel: any) => rel.product_id);

    return {
      id: cat.id,
      name: cat.name,
      nameEn: cat.name_en,
      genericProductIds: productIds,
      isNotFood: false, // Default value since it's not in Supabase schema
    };
  });
};
