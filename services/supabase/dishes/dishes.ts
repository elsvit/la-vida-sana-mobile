import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types';

export class SupabaseDishesService {
  constructor(private client: SupabaseClient<Database>) {}

  // Dishes
  async getDishes(): Promise<Database['public']['Tables']['dishes']['Row'][]> {
    const { data, error } = await this.client.from('dishes').select('*');
    if (error) {
      throw new Error(`Error fetching dishes: ${error.message}`);
    }

    return data || [];
  }

  async getDishById(
    id: string,
  ): Promise<Database['public']['Tables']['dishes']['Row'] | null> {
    const { data, error } = await this.client
      .from('dishes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Error fetching dish by id: ${error.message}`);
    }

    return data;
  }

  // async createDish(
  //   data: Database['public']['Tables']['dishes']['Insert']
  // ): Promise<Database['public']['Tables']['dishes']['Row']> {
  //   const { data: result, error } = await this.client.from('dishes').insert(data).select().single();

  //   if (error) {
  //     throw new Error(`Error creating dish: ${error.message}`);
  //   }

  //   return result;
  // }

  // async updateDish(
  //   id: string,
  //   data: Database['public']['Tables']['dishes']['Update']
  // ): Promise<Database['public']['Tables']['dishes']['Row']> {
  //   const { data: result, error } = await this.client
  //     .from('dishes')
  //     .update(data)
  //     .eq('id', id)
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error updating dish: ${error.message}`);
  //   }

  //   return result;
  // }

  // async deleteDish(id: string): Promise<void> {
  //   // First, get the dish to retrieve image URLs
  //   const dish = await this.getDishById(id);

  //   // Delete all related dish products
  //   await this.deleteAllDishProducts(id);

  //   // Delete associated images from storage if they exist
  //   if (dish) {
  //     try {
  //       // Delete main image if it exists
  //       if (dish.image) {
  //         const imagePath = this.extractPathFromUrl(dish.image);
  //         if (imagePath) {
  //           await this.deleteImageFromStorage(imagePath);
  //         }
  //       }

  //       // Delete thumbnail if it exists
  //       if (dish.thumbnail) {
  //         const thumbnailPath = this.extractPathFromUrl(dish.thumbnail);
  //         if (thumbnailPath) {
  //           await this.deleteImageFromStorage(thumbnailPath);
  //         }
  //       }
  //     } catch (error) {
  //       // Log the error but don't fail the dish deletion
  //       console.warn('Failed to delete dish images from storage:', error);
  //     }
  //   }

  //   // Finally, delete the dish from the database
  //   const { error } = await this.client.from('dishes').delete().eq('id', id);

  //   if (error) {
  //     throw new Error(`Error deleting dish: ${error.message}`);
  //   }
  // }

  // Dish Products (junction table) - Simplified
  async getDishProducts(): Promise<
    Database['public']['Tables']['dish_products']['Row'][]
  > {
    const { data, error } = await this.client.from('dish_products').select('*');

    if (error) {
      throw new Error(`Error fetching dish products: ${error.message}`);
    }

    return data || [];
  }

  // Update the dish products methods to include size and size_format
  // async upsertDishProduct(
  //   data: Database['public']['Tables']['dish_products']['Insert']
  // ): Promise<Database['public']['Tables']['dish_products']['Row']> {
  //   const { data: result, error } = await this.client
  //     .from('dish_products')
  //     .upsert(data, {
  //       onConflict: 'dish_id,product_id,seller',
  //       ignoreDuplicates: false,
  //     })
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error upserting dish product: ${error.message}`);
  //   }

  //   return result;
  // }

  // Add method to get dish products with full product details
  // async getDishProductsWithDetails(dishId: string): Promise<any[]> {
  //   const { data, error } = await this.client
  //     .from('dish_products')
  //     .select(
  //       `
  //       *,
  //       mercadona_products!inner(*),
  //       carrefour_products!inner(*),
  //       generic_products!inner(*)
  //     `
  //     )
  //     .eq('dish_id', dishId);

  //   if (error) {
  //     throw new Error(`Error fetching dish products with details: ${error.message}`);
  //   }

  //   return data || [];
  // }

  // async deleteDishProduct(dishId: string, productId: string, seller: string): Promise<void> {
  //   const { error } = await this.client
  //     .from('dish_products')
  //     .delete()
  //     .eq('dish_id', dishId)
  //     .eq('product_id', productId)
  //     .eq('seller', seller);

  //   if (error) {
  //     throw new Error(`Error deleting dish product: ${error.message}`);
  //   }
  // }

  // Bulk upsert for dish products
  // async bulkUpsertDishProducts(
  //   dishProducts: Database['public']['Tables']['dish_products']['Insert'][]
  // ): Promise<Database['public']['Tables']['dish_products']['Row'][]> {
  //   if (dishProducts.length === 0) {
  //     return [];
  //   }

  //   const { data, error } = await this.client
  //     .from('dish_products')
  //     .upsert(dishProducts, {
  //       onConflict: 'dish_id,product_id,seller',
  //       ignoreDuplicates: false,
  //     })
  //     .select();

  //   if (error) {
  //     throw new Error(`Error bulk upserting dish products: ${error.message}`);
  //   }

  //   return data || [];
  // }

  // Advanced Queries
  // async searchDishes(query: string): Promise<Database['public']['Tables']['dishes']['Row'][]> {
  //   const { data, error } = await this.client
  //     .from('dishes')
  //     .select('*')
  //     .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

  //   if (error) {
  //     throw new Error(`Error searching dishes: ${error.message}`);
  //   }

  //   return data || [];
  // }

  // Bulk Operations
  // async bulkUpsertDishes(
  //   dishes: Database['public']['Tables']['dishes']['Insert'][]
  // ): Promise<Database['public']['Tables']['dishes']['Row'][]> {
  //   const { data, error } = await this.client
  //     .from('dishes')
  //     .upsert(dishes, {
  //       onConflict: 'id',
  //       ignoreDuplicates: false,
  //     })
  //     .select();

  //   if (error) {
  //     throw new Error(`Error bulk upserting dishes: ${error.message}`);
  //   }

  //   return data || [];
  // }

  // Check if dishes already exist in Supabase
  // async checkDishesExist(dishIds: string[]): Promise<{ existing: string[]; new: string[] }> {
  //   if (dishIds.length === 0) {
  //     return { existing: [], new: [] };
  //   }

  //   const { data, error } = await this.client.from('dishes').select('id').in('id', dishIds);

  //   if (error) {
  //     throw new Error(`Error checking existing dishes: ${error.message}`);
  //   }

  //   const existingIds = data?.map(d => d.id) || [];
  //   const newIds = dishIds.filter(id => !existingIds.includes(id));

  //   return { existing: existingIds, new: newIds };
  // }

  // Helper method to extract path from Supabase storage URL
  // private extractPathFromUrl(url: string): string | null {
  //   try {
  //     const urlObj = new URL(url);
  //     // Supabase storage URLs typically have the format:
  //     // https://[project].supabase.co/storage/v1/object/public/dishes/[path]
  //     const pathMatch = urlObj.pathname.match(/\/storage\/v1\/object\/public\/dishes\/(.+)/);
  //     if (!pathMatch) return null;

  //     let path = pathMatch[1];

  //     // Handle the case where the path includes the bucket name twice (legacy issue)
  //     // e.g., "dishes/d_0002.jpg" should become "d_0002.jpg"
  //     if (path.startsWith('dishes/')) {
  //       path = path.substring(7); // Remove "dishes/" prefix
  //     }

  //     return path;
  //   } catch {
  //     return null;
  //   }
  // }

  // Helper method to delete image from storage
  // private async deleteImageFromStorage(path: string): Promise<void> {
  //   const { error } = await this.client.storage.from('dishes').remove([path]);
  //   if (error) {
  //     throw new Error(`Error deleting image from storage: ${error.message}`);
  //   }
  // }
}
