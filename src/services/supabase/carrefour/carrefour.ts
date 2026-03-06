import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types';
import { BaseSellerService } from '../base/BaseSellerService';

export class SupabaseCarrefourService extends BaseSellerService<
  Database['public']['Tables']['carrefour_products']['Row'],
  Database['public']['Tables']['carrefour_categories']['Row'],
  Database['public']['Tables']['carrefour_category_products']['Row'],
  'carrefour_products',
  'carrefour_categories',
  'carrefour_category_products'
> {
  private static instance: SupabaseCarrefourService;

  private constructor(client: SupabaseClient<Database>) {
    super(
      client,
      'carrefour_products',
      'carrefour_categories',
      'carrefour_category_products',
    );
  }

  static getInstance(
    client: SupabaseClient<Database>,
  ): SupabaseCarrefourService {
    if (!SupabaseCarrefourService.instance) {
      SupabaseCarrefourService.instance = new SupabaseCarrefourService(client);
      console.log('Created new Carrefour service instance');
    }
    return SupabaseCarrefourService.instance;
  }

  // Implement abstract methods
  protected async _fetchProducts(): Promise<
    Database['public']['Tables']['carrefour_products']['Row'][]
  > {
    return this.fetchWithPagination<
      Database['public']['Tables']['carrefour_products']['Row']
    >('carrefour_products');
  }

  protected async _fetchCategories(): Promise<
    Database['public']['Tables']['carrefour_categories']['Row'][]
  > {
    return this.fetchWithPagination<
      Database['public']['Tables']['carrefour_categories']['Row']
    >('carrefour_categories');
  }

  protected async _fetchCategoryProducts(): Promise<any[]> {
    return this.fetchWithPagination('carrefour_category_products');
  }

  // Add any Carrefour-specific methods here if needed
}
