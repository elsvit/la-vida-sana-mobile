import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types';

// Define table name types for type safety
// type TablePrefix = 'mercadona' | 'carrefour' | 'generic';
// type ProductTable = `${TablePrefix}_products`;
// type CategoryTable = `${TablePrefix}_categories`;
// type CategoryProductTable = `${TablePrefix}_category_products`;

export interface ISellerService<
  TProduct,
  TCategory,
  // TProductInsert,
  // TCategoryInsert,
  TCategoryProductRow,
> {
  // Basic read operations only
  getProducts(): Promise<TProduct[]>;
  getCategories(): Promise<TCategory[]>;
  getProductById(id: string): Promise<TProduct | null>;
  getCategoryById(id: string): Promise<TCategory | null>;
  getCategoryProducts(): Promise<TCategoryProductRow[]>;
}

export abstract class BaseSellerService<
  TProduct,
  TCategory,
  // TProductInsert,
  // TCategoryInsert,
  TCategoryProductRow,
  TProductTable extends keyof Database['public']['Tables'],
  TCategoryTable extends keyof Database['public']['Tables'],
  TCategoryProductTable extends keyof Database['public']['Tables'],
> implements
    ISellerService<
      TProduct,
      TCategory,
      // TProductInsert,
      // TCategoryInsert,
      TCategoryProductRow
    >
{
  protected _productsCache: TProduct[] | null = null;
  protected _categoriesCache: TCategory[] | null = null;
  protected _categoryProductsCache: TCategoryProductRow[] | null = null;
  protected _productsPromise: Promise<TProduct[]> | null = null;
  protected _categoriesPromise: Promise<TCategory[]> | null = null;
  protected _categoryProductsPromise: Promise<TCategoryProductRow[]> | null =
    null;

  constructor(
    protected client: SupabaseClient<Database>,
    protected productTable: TProductTable,
    protected categoryTable: TCategoryTable,
    protected categoryProductTable: TCategoryProductTable,
  ) {}

  // Generic getProducts with caching and deduplication
  async getProducts(): Promise<TProduct[]> {
    if (this._productsCache) {
      console.log(
        `Returning cached ${this.productTable} products:`,
        this._productsCache.length,
      );
      return this._productsCache;
    }

    if (this._productsPromise) {
      console.log(
        `Returning existing ${this.productTable} products request promise`,
      );
      return this._productsPromise;
    }

    console.log(`Starting new ${this.productTable} products request...`);
    this._productsPromise = this._fetchProducts();

    try {
      const result = await this._productsPromise;
      this._productsCache = result;
      return result;
    } finally {
      this._productsPromise = null;
    }
  }

  // Generic getCategories with caching and deduplication
  async getCategories(): Promise<TCategory[]> {
    if (this._categoriesCache) {
      console.log(
        `Returning cached ${this.categoryTable} categories:`,
        this._categoriesCache.length,
      );
      return this._categoriesCache;
    }

    if (this._categoriesPromise) {
      console.log(
        `Returning existing ${this.categoryTable} categories request promise`,
      );
      return this._categoriesPromise;
    }

    console.log(`Starting new ${this.categoryTable} categories request...`);
    this._categoriesPromise = this._fetchCategories();

    try {
      const result = await this._categoriesPromise;
      this._categoriesCache = result;
      return result;
    } finally {
      this._categoriesPromise = null;
    }
  }

  // Abstract methods that each seller must implement
  protected abstract _fetchProducts(): Promise<TProduct[]>;
  protected abstract _fetchCategories(): Promise<TCategory[]>;
  protected abstract _fetchCategoryProducts(): Promise<TCategoryProductRow[]>;

  // Generic CRUD operations with proper typing
  async getProductById(id: string): Promise<TProduct | null> {
    const { data, error } = await (this.client as any)
      .from(this.productTable)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(
        `Error fetching ${this.productTable} product by id: ${error.message}`,
      );
    }

    return data as TProduct;
  }

  async getCategoryById(id: string): Promise<TCategory | null> {
    const { data, error } = await (this.client as any)
      .from(this.categoryTable)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(
        `Error fetching ${this.categoryTable} category by id: ${error.message}`,
      );
    }

    return data as TCategory;
  }

  // Generic getCategoryProducts with caching and deduplication
  async getCategoryProducts(): Promise<TCategoryProductRow[]> {
    if (this._categoryProductsCache) {
      console.log(
        `Returning cached ${this.categoryProductTable} category products:`,
        this._categoryProductsCache.length,
      );
      return this._categoryProductsCache;
    }

    if (this._categoryProductsPromise) {
      console.log(
        `Returning existing ${this.categoryProductTable} category products request promise`,
      );
      return this._categoryProductsPromise;
    }

    console.log(
      `Starting new ${this.categoryProductTable} category products request...`,
    );
    this._categoryProductsPromise = this._fetchCategoryProducts();

    try {
      const result = await this._categoryProductsPromise;
      this._categoryProductsCache = result;
      return result;
    } finally {
      this._categoryProductsPromise = null;
    }
  }

  // Cache management methods
  // clearCache(): void {
  //   this._productsCache = null;
  //   this._categoriesCache = null;
  //   this._categoryProductsCache = null;
  //   this._productsPromise = null;
  //   this._categoriesPromise = null;
  //   this._categoryProductsPromise = null;
  // }

  // Generic pagination helper with proper typing
  protected async fetchWithPagination<T>(
    tableName: keyof Database['public']['Tables'],
    limit: number = 1000,
  ): Promise<T[]> {
    const allData: T[] = [];
    let offset = 0;

    while (true) {
      console.log(
        `Fetching ${String(tableName)}: offset=${offset}, limit=${limit}`,
      );
      const { data, error } = await this.client
        .from(tableName)
        .select('*')
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error(
          `Error fetching ${String(tableName)}: ${error.message}`,
        );
      }

      if (!data || data.length === 0) {
        console.log(`No more data at offset ${offset}, breaking loop`);
        break;
      }

      console.log(`Got ${data.length} items at offset ${offset}`);
      allData.push(...(data as T[]));

      if (data.length < limit) {
        console.log(
          `Last page reached (${data.length} < ${limit}), breaking loop`,
        );
        break;
      }

      offset += limit;
      console.log(`Moving to next page: offset=${offset}`);

      // Safety check
      if (offset > 100000) {
        console.warn('Safety limit reached, breaking loop');
        break;
      }
    }

    console.log(
      `Fetched ${allData.length} ${String(
        tableName,
      )} items using pagination (${Math.ceil(
        allData.length / limit,
      )} requests)`,
    );
    return allData;
  }
}
