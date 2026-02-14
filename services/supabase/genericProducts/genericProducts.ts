import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types';

export class SupabaseGenericProductsService {
  constructor(private client: SupabaseClient<Database>) {}

  // Categories
  async getCategories(): Promise<
    Database['public']['Tables']['generic_categories']['Row'][]
  > {
    const { data, error } = await this.client
      .from('generic_categories')
      .select('*');

    if (error) {
      throw new Error(`Error fetching generic categories: ${error.message}`);
    }

    return data || [];
  }

  async getCategoryById(
    id: string,
  ): Promise<Database['public']['Tables']['generic_categories']['Row'] | null> {
    const { data, error } = await this.client
      .from('generic_categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(
        `Error fetching generic category by id: ${error.message}`,
      );
    }

    return data;
  }

  // async createCategory(
  //   data: Database['public']['Tables']['generic_categories']['Insert']
  // ): Promise<Database['public']['Tables']['generic_categories']['Row']> {
  //   const { data: result, error } = await this.client
  //     .from('generic_categories')
  //     .insert(data)
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error creating generic category: ${error.message}`);
  //   }

  //   return result;
  // }

  // async updateCategory(
  //   id: string,
  //   data: Database['public']['Tables']['generic_categories']['Update']
  // ): Promise<Database['public']['Tables']['generic_categories']['Row']> {
  //   const { data: result, error } = await this.client
  //     .from('generic_categories')
  //     .update(data)
  //     .eq('id', id)
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error updating generic category: ${error.message}`);
  //   }

  //   return result;
  // }

  // async deleteCategory(id: string): Promise<void> {
  //   const { error } = await this.client.from('generic_categories').delete().eq('id', id);

  //   if (error) {
  //     throw new Error(`Error deleting generic category: ${error.message}`);
  //   }
  // }

  // Products
  async getProducts(): Promise<
    Database['public']['Tables']['generic_products']['Row'][]
  > {
    const { data, error } = await this.client
      .from('generic_products')
      .select('*');

    if (error) {
      throw new Error(`Error fetching generic products: ${error.message}`);
    }

    return data || [];
  }

  async getProductById(
    id: string,
  ): Promise<Database['public']['Tables']['generic_products']['Row'] | null> {
    const { data, error } = await this.client
      .from('generic_products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Error fetching generic product by id: ${error.message}`);
    }

    return data;
  }

  // async createProduct(
  //   data: Database['public']['Tables']['generic_products']['Insert']
  // ): Promise<Database['public']['Tables']['generic_products']['Row']> {
  //   const { data: result, error } = await this.client
  //     .from('generic_products')
  //     .insert(data)
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error creating generic product: ${error.message}`);
  //   }

  //   return result;
  // }

  // async updateProduct(
  //   id: string,
  //   data: Database['public']['Tables']['generic_products']['Update']
  // ): Promise<Database['public']['Tables']['generic_products']['Row']> {
  //   const { data: result, error } = await this.client
  //     .from('generic_products')
  //     .update(data)
  //     .eq('id', id)
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error updating generic product: ${error.message}`);
  //   }

  //   return result;
  // }

  // async deleteProduct(id: string): Promise<void> {
  //   const { error } = await this.client.from('generic_products').delete().eq('id', id);

  //   if (error) {
  //     throw new Error(`Error deleting generic product: ${error.message}`);
  //   }
  // }

  // Product Matching
  async getProductMatching(): Promise<
    Database['public']['Tables']['generic_product_matching']['Row'][]
  > {
    const { data, error } = await this.client
      .from('generic_product_matching')
      .select('*');

    if (error) {
      throw new Error(
        `Error fetching generic product matching: ${error.message}`,
      );
    }

    return data || [];
  }

  // async createProductMatching(
  //   data: Database['public']['Tables']['generic_product_matching']['Insert']
  // ): Promise<Database['public']['Tables']['generic_product_matching']['Row']> {
  //   const { data: result, error } = await this.client
  //     .from('generic_product_matching')
  //     .insert(data)
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error creating generic product matching: ${error.message}`);
  //   }

  //   return result;
  // }

  // async deleteProductMatching(
  //   genericProductId: string,
  //   seller: string,
  //   sellerProductId: string
  // ): Promise<void> {
  //   const { error } = await this.client
  //     .from('generic_product_matching')
  //     .delete()
  //     .eq('generic_product_id', genericProductId)
  //     .eq('seller', seller)
  //     .eq('seller_product_id', sellerProductId)
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error deleting generic product matching: ${error.message}`);
  //   }
  // }

  // async updateProductMatching(
  //   genericProductId: string,
  //   seller: string,
  //   sellerProductId: string,
  //   data: Database['public']['Tables']['generic_product_matching']['Update']
  // ): Promise<Database['public']['Tables']['generic_product_matching']['Row']> {
  //   const { data: result, error } = await this.client
  //     .from('generic_product_matching')
  //     .update(data)
  //     .eq('generic_product_id', genericProductId)
  //     .eq('seller', seller)
  //     .eq('seller_product_id', sellerProductId)
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error updating generic product matching: ${error.message}`);
  //   }

  //   return result;
  // }

  // Alternative: Add an upsert method that handles both create and update
  // async upsertProductMatching(
  //   data: Database['public']['Tables']['generic_product_matching']['Insert']
  // ): Promise<Database['public']['Tables']['generic_product_matching']['Row']> {
  //   const { data: result, error } = await this.client
  //     .from('generic_product_matching')
  //     .upsert(data, {
  //       onConflict: 'generic_product_id,seller,seller_product_id',
  //       ignoreDuplicates: false,
  //     })
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error upserting generic product matching: ${error.message}`);
  //   }

  //   return result;
  // }

  // Category-Product Relationships
  async getCategoryProducts(): Promise<
    Database['public']['Tables']['generic_category_products']['Row'][]
  > {
    const { data, error } = await this.client
      .from('generic_category_products')
      .select('*');

    if (error) {
      throw new Error(
        `Error fetching generic category products: ${error.message}`,
      );
    }

    return data || [];
  }

  // async createCategoryProduct(
  //   data: Database['public']['Tables']['generic_category_products']['Insert']
  // ): Promise<Database['public']['Tables']['generic_category_products']['Row']> {
  //   const { data: result, error } = await this.client
  //     .from('generic_category_products')
  //     .upsert(data, {
  //       onConflict: 'category_id,product_id',
  //       ignoreDuplicates: false,
  //     })
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error creating generic category product: ${error.message}`);
  //   }

  //   return result;
  // }

  // async deleteCategoryProduct(categoryId: string, productId: string): Promise<void> {
  //   const { error } = await this.client
  //     .from('generic_category_products')
  //     .delete()
  //     .eq('category_id', categoryId)
  //     .eq('product_id', productId);

  //   if (error) {
  //     throw new Error(`Error deleting generic category product: ${error.message}`);
  //   }
  // }

  // Advanced Queries
  async getProductsByCategory(
    categoryId: string,
  ): Promise<Database['public']['Tables']['generic_products']['Row'][]> {
    const { data, error } = await this.client
      .from('generic_products')
      .select('*')
      .eq('category_id', categoryId);

    if (error) {
      throw new Error(
        `Error fetching generic products by category: ${error.message}`,
      );
    }

    return data || [];
  }

  async searchProducts(
    query: string,
  ): Promise<Database['public']['Tables']['generic_products']['Row'][]> {
    const { data, error } = await this.client
      .from('generic_products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    if (error) {
      throw new Error(`Error searching generic products: ${error.message}`);
    }

    return data || [];
  }

  // Bulk Operations
  // async bulkCreateProducts(
  //   products: Database['public']['Tables']['generic_products']['Insert'][]
  // ): Promise<Database['public']['Tables']['generic_products']['Row'][]> {
  //   const { data, error } = await this.client
  //     .from('generic_products')
  //     .upsert(products, { onConflict: 'id' }) // This will update if exists, insert if not
  //     .select();

  //   if (error) {
  //     throw new Error(`Error bulk upserting generic products: ${error.message}`);
  //   }

  //   return data || [];
  // }

  // async bulkCreateCategories(
  //   categories: Database['public']['Tables']['generic_categories']['Insert'][]
  // ): Promise<Database['public']['Tables']['generic_categories']['Row'][]> {
  //   const { data, error } = await this.client
  //     .from('generic_categories')
  //     .upsert(categories, { onConflict: 'id' }) // This will update if exists, insert if not
  //     .select();

  //   if (error) {
  //     throw new Error(`Error bulk upserting generic categories: ${error.message}`);
  //   }

  //   return data || [];
  // }
}
