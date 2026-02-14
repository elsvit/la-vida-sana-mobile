import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types';
import { BaseSellerService } from '../base/BaseSellerService';

export class SupabaseMercadonaService extends BaseSellerService<
  Database['public']['Tables']['mercadona_products']['Row'],
  Database['public']['Tables']['mercadona_categories']['Row'],
  Database['public']['Tables']['mercadona_category_products']['Row'],
  'mercadona_products',
  'mercadona_categories',
  'mercadona_category_products'
> {
  private static instance: SupabaseMercadonaService;

  private constructor(client: SupabaseClient<Database>) {
    super(
      client,
      'mercadona_products',
      'mercadona_categories',
      'mercadona_category_products',
    );
  }

  static getInstance(
    client: SupabaseClient<Database>,
  ): SupabaseMercadonaService {
    if (!SupabaseMercadonaService.instance) {
      SupabaseMercadonaService.instance = new SupabaseMercadonaService(client);
      console.log('Created new Mercadona service instance');
    }
    return SupabaseMercadonaService.instance;
  }

  // Implement abstract methods
  protected async _fetchProducts(): Promise<
    Database['public']['Tables']['mercadona_products']['Row'][]
  > {
    return this.fetchWithPagination<
      Database['public']['Tables']['mercadona_products']['Row']
    >('mercadona_products');
  }

  protected async _fetchCategories(): Promise<
    Database['public']['Tables']['mercadona_categories']['Row'][]
  > {
    return this.fetchWithPagination<
      Database['public']['Tables']['mercadona_categories']['Row']
    >('mercadona_categories');
  }

  protected async _fetchCategoryProducts(): Promise<any[]> {
    return this.fetchWithPagination('mercadona_category_products');
  }

  // Add any Mercadona-specific methods here if needed
}
