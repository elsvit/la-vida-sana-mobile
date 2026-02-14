import {
  createClient,
  SupabaseClient,
  SupabaseClientOptions,
} from '@supabase/supabase-js';
import { CONFIG } from '~/constants/config';
import { Database } from './types';
import { SupabaseMercadonaService } from './mercadona';
import { SupabaseCarrefourService } from './carrefour';
import { SupabaseGenericProductsService } from './genericProducts';
import { SupabaseDishesService } from './dishes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = CONFIG;

class SupabaseService {
  private static instance: SupabaseService | null = null;
  private client: SupabaseClient<Database>;
  public mercadona: SupabaseMercadonaService;
  public carrefour: SupabaseCarrefourService;
  public genericProducts: SupabaseGenericProductsService;
  public dishes: SupabaseDishesService;

  private constructor(client: SupabaseClient<Database>) {
    this.client = client;

    // Initialize domain-specific services
    this.mercadona = SupabaseMercadonaService.getInstance(this.client);
    this.carrefour = SupabaseCarrefourService.getInstance(this.client);
    this.genericProducts = new SupabaseGenericProductsService(this.client);
    this.dishes = new SupabaseDishesService(this.client);
  }

  public static getInstance(): SupabaseService | null {
    if (!SupabaseService?.instance && SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const clientOptions: SupabaseClientOptions<'public'> = {
          storage: AsyncStorage as any,
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
          },
        };
        const client = createClient<Database>(
          SUPABASE_URL,
          SUPABASE_ANON_KEY,
          clientOptions,
        ) as SupabaseClient<Database>;

        SupabaseService.instance = new SupabaseService(client);
      } catch (error) {
        console.warn('Error creating SupabaseService getInstance:', error);
        return null;
      }
    }
    return SupabaseService.instance;
  }

  // Get the Supabase client instance
  getClient(): SupabaseClient<Database> {
    return this.client;
  }

  // Generic CRUD operations for any table
  async getAll<T extends keyof Database['public']['Tables']>(
    table: T,
  ): Promise<Database['public']['Tables'][T]['Row'][]> {
    const { data, error } = await this.client.from(table).select('*');

    if (error) {
      throw new Error(`Error fetching ${table}: ${error.message}`);
    }

    return (data || []) as unknown as Database['public']['Tables'][T]['Row'][];
  }

  async getById<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string,
  ): Promise<Database['public']['Tables'][T]['Row'] | null> {
    const { data, error } = await this.client
      .from(table)
      .select('*')
      .eq('id', id as any)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No rows returned
      }
      throw new Error(`Error fetching ${table} by id: ${error.message}`);
    }

    return data as unknown as Database['public']['Tables'][T]['Row'] | null;
  }

  // async create<T extends keyof Database['public']['Tables']>(
  //   table: T,
  //   data: Database['public']['Tables'][T]['Insert']
  // ): Promise<Database['public']['Tables'][T]['Row']> {
  //   const { data: result, error } = await this.client.from(table).insert(data).select().single();

  //   if (error) {
  //     throw new Error(`Error creating ${table}: ${error.message}`);
  //   }

  //   return result;
  // }

  // async update<T extends keyof Database['public']['Tables']>(
  //   table: T,
  //   id: string,
  //   data: Database['public']['Tables'][T]['Update']
  // ): Promise<Database['public']['Tables'][T]['Row']> {
  //   const { data: result, error } = await this.client
  //     .from(table)
  //     .update(data)
  //     .eq('id', id)
  //     .select()
  //     .single();

  //   if (error) {
  //     throw new Error(`Error updating ${table}: ${error.message}`);
  //   }

  //   return result;
  // }

  // async delete<T extends keyof Database['public']['Tables']>(table: T, id: string): Promise<void> {
  //   const { error } = await this.client.from(table).delete().eq('id', id);

  //   if (error) {
  //     throw new Error(`Error deleting ${table}: ${error.message}`);
  //   }
  // }

  // Image upload methods
  // async uploadImage(
  //   file: File,
  //   path?: string,
  //   options?: {
  //     cacheControl?: string;
  //     upsert?: boolean;
  //   }
  // ): Promise<{ path: string; url: string }> {
  //   try {
  //     // Generate a unique filename if no path is provided
  //     const fileName = path || `${Date.now()}-${file.name}`;
  //     // Use the path directly - Supabase will handle the bucket prefix
  //     const filePath = fileName;

  //     const { data, error } = await this.client.storage
  //       .from(SUPABASE_IMAGES_BUCKET)
  //       .upload(filePath, file, {
  //         cacheControl: options?.cacheControl ?? '3600',
  //         upsert: true, //options?.upsert || false,
  //       });

  //     if (error) {
  //       throw new Error(`Error uploading image: ${error.message}`);
  //     }

  //     // Get the public URL for the uploaded image
  //     const { data: urlData } = this.client.storage
  //       .from(SUPABASE_IMAGES_BUCKET)
  //       .getPublicUrl(filePath);

  //     return {
  //       path: filePath,
  //       url: urlData.publicUrl,
  //     };
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // Image compression and upload methods
  // async compressAndUploadImage(
  //   file: File,
  //   options?: {
  //     maxSizeMB?: number;
  //     maxWidthOrHeight?: number;
  //     useWebWorker?: boolean;
  //   }
  // ): Promise<{ path: string; url: string; originalSize: number; compressedSize: number }> {
  //   try {
  //     const originalSize = file.size;

  //     // Compress the image
  //     const compressedFile = await imageCompression(file, {
  //       maxSizeMB: options?.maxSizeMB || 0.09, // 90KB default
  //       maxWidthOrHeight: options?.maxWidthOrHeight || 1024,
  //       useWebWorker: options?.useWebWorker || true,
  //     });

  //     const compressedSize = compressedFile.size;

  //     // Upload the compressed image
  //     const { path, url } = await this.uploadImage(compressedFile);

  //     return {
  //       path,
  //       url,
  //       originalSize,
  //       compressedSize,
  //     };
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to compress and upload image: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async uploadImageWithThumbnail(
  //   file: File,
  //   options?: {
  //     imageMaxSizeMB?: number;
  //     thumbnailMaxSizeMB?: number;
  //     imageMaxWidthOrHeight?: number;
  //     thumbnailMaxWidthOrHeight?: number;
  //   }
  // ): Promise<{
  //   imagePath: string;
  //   imageUrl: string;
  //   thumbnailPath: string;
  //   thumbnailUrl: string;
  //   originalSize: number;
  //   imageSize: number;
  //   thumbnailSize: number;
  // }> {
  //   try {
  //     const originalSize = file.size;

  //     // Compress main image (100KB)
  //     const imageFile = await imageCompression(file, {
  //       maxSizeMB: options?.imageMaxSizeMB || 0.09, // 90KB
  //       maxWidthOrHeight: options?.imageMaxWidthOrHeight || 1024,
  //       useWebWorker: true,
  //     });

  //     // Compress thumbnail (10KB)
  //     const thumbnailFile = await imageCompression(file, {
  //       maxSizeMB: options?.thumbnailMaxSizeMB || 0.01, // 10KB
  //       maxWidthOrHeight: options?.thumbnailMaxWidthOrHeight || 300,
  //       useWebWorker: true,
  //     });

  //     // Upload both images
  //     const { path: imagePath, url: imageUrl } = await this.uploadImage(imageFile);
  //     const { path: thumbnailPath, url: thumbnailUrl } = await this.uploadImage(
  //       thumbnailFile,
  //       `thumbnails/${Date.now()}-${file.name}`
  //     );

  //     return {
  //       imagePath,
  //       imageUrl,
  //       thumbnailPath,
  //       thumbnailUrl,
  //       originalSize,
  //       imageSize: imageFile.size,
  //       thumbnailSize: thumbnailFile.size,
  //     };
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to upload image with thumbnail: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async uploadImageFromMac(
  //   filePath: string,
  //   fileName?: string,
  //   options?: {
  //     imageMaxSizeMB?: number;
  //     thumbnailMaxSizeMB?: number;
  //   }
  // ): Promise<{
  //   imagePath: string;
  //   imageUrl: string;
  //   thumbnailPath: string;
  //   thumbnailUrl: string;
  // }> {
  //   try {
  //     // For Mac file paths, you'll need to convert the file path to a File object
  //     // This is a simplified implementation - you might need to adjust based on your setup

  //     // If you're using Electron or similar, you can read the file like this:
  //     // const response = await fetch(`file://${filePath}`);
  //     // const blob = await response.blob();
  //     // const file = new File([blob], fileName || 'image.jpg', { type: 'image/jpeg' });

  //     // For now, this is a placeholder that shows the expected interface
  //     throw new Error(
  //       'uploadImageFromMac requires file system access. Use uploadImageWithThumbnail with a File object instead.'
  //     );
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to upload image from Mac: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async uploadImageFromFileInput(
  //   fileInput: HTMLInputElement,
  //   options?: {
  //     cacheControl?: string;
  //     upsert?: boolean;
  //   }
  // ): Promise<{ path: string; url: string }> {
  //   const file = fileInput.files?.[0];
  //   if (!file) {
  //     throw new Error('No file selected');
  //   }

  //   return this.uploadImage(file, undefined, options);
  // }

  // async uploadImageFromDragAndDrop(
  //   event: DragEvent,
  //   options?: {
  //     cacheControl?: string;
  //     upsert?: boolean;
  //   }
  // ): Promise<{ path: string; url: string }> {
  //   const files = event.dataTransfer?.files;
  //   if (!files || files.length === 0) {
  //     throw new Error('No files dropped');
  //   }

  //   const file = files[0];
  //   if (!file.type.startsWith('image/')) {
  //     throw new Error('Dropped file is not an image');
  //   }

  //   return this.uploadImage(file, undefined, options);
  // }

  // async deleteImage(path: string): Promise<void> {
  //   try {
  //     const { error } = await this.client.storage.from(SUPABASE_IMAGES_BUCKET).remove([path]);

  //     if (error) {
  //       throw new Error(`Error deleting image: ${error.message}`);
  //     }
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to delete image: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async getImageUrl(path: string): Promise<string> {
  //   const { data } = this.client.storage.from(SUPABASE_IMAGES_BUCKET).getPublicUrl(path);

  //   return data.publicUrl;
  // }

  // async listImages(prefix?: string): Promise<string[]> {
  //   try {
  //     const { data, error } = await this.client.storage
  //       .from(SUPABASE_IMAGES_BUCKET)
  //       .list(prefix || 'dishes/');

  //     if (error) {
  //       throw new Error(`Error listing images: ${error.message}`);
  //     }

  //     return data?.map(item => item.name) || [];
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to list images: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // Check if an image exists in Supabase storage
  // async checkImageExists(path: string): Promise<boolean> {
  //   try {
  //     const { data, error } = await this.client.storage.from(SUPABASE_IMAGES_BUCKET).list('', {
  //       search: path,
  //     });

  //     if (error) {
  //       throw new Error(`Error checking image existence: ${error.message}`);
  //     }

  //     // Check if the exact file exists
  //     return data?.some(item => item.name === path) || false;
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to check image existence: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // Update dish with image
  // async createDishWithImage(
  //   dishData: Database['public']['Tables']['dishes']['Insert'],
  //   imageFile: File
  // ): Promise<Database['public']['Tables']['dishes']['Row']> {
  //   try {
  //     // Upload the image first
  //     const { url: imageUrl } = await this.uploadImage(imageFile);

  //     // Create the dish with the image URL
  //     const dishWithImage = {
  //       ...dishData,
  //       image_url: imageUrl,
  //     };

  //     return await this.create('dishes', dishWithImage);
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to create dish with image: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async updateDishWithImage(
  //   id: string,
  //   dishData: Database['public']['Tables']['dishes']['Update'],
  //   imageFile?: File
  // ): Promise<Database['public']['Tables']['dishes']['Row']> {
  //   try {
  //     let imageUrl = dishData.image;

  //     // Upload new image if provided
  //     if (imageFile) {
  //       const { url } = await this.uploadImage(imageFile);
  //       imageUrl = url;
  //     }

  //     // Update the dish with the image URL
  //     const dishWithImage = {
  //       ...dishData,
  //       image_url: imageUrl,
  //     };

  //     return await this.update('dishes', id, dishWithImage);
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to update dish with image: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // Update dish with compressed image and thumbnail
  // async updateDishWithCompressedImage(
  //   id: string,
  //   dishData: Database['public']['Tables']['dishes']['Update'],
  //   imageFile?: File
  // ): Promise<Database['public']['Tables']['dishes']['Row']> {
  //   try {
  //     let imageUrl = dishData.image;
  //     let thumbnailUrl = dishData.thumbnail;

  //     // Upload new image and thumbnail if provided
  //     if (imageFile) {
  //       const { imageUrl: newImageUrl, thumbnailUrl: newThumbnailUrl } =
  //         await this.uploadImageWithThumbnail(imageFile);
  //       imageUrl = newImageUrl;
  //       thumbnailUrl = newThumbnailUrl;
  //     }

  //     // Update the dish with both URLs
  //     const dishWithImages = {
  //       ...dishData,
  //       image_url: imageUrl,
  //       thumbnail_url: thumbnailUrl,
  //     };

  //     return await this.update('dishes', id, dishWithImages);
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to update dish with compressed image: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // Temporary method to transform images only (no automatic saving)
  // async transformAndSaveToMac(
  //   file: File,
  //   options?: {
  //     imageMaxSizeMB?: number;
  //     thumbnailMaxSizeMB?: number;
  //     imageMaxWidthOrHeight?: number;
  //     thumbnailMaxWidthOrHeight?: number;
  //     macSavePath?: string;
  //   }
  // ): Promise<{
  //   originalSize: number;
  //   imageSize: number;
  //   thumbnailSize: number;
  //   macImagePath: string;
  //   macThumbnailPath: string;
  //   imageFile: File;
  //   thumbnailFile: File;
  // }> {
  //   try {
  //     const originalSize = file.size;

  //     // Compress main image (100KB)
  //     const imageFile = await imageCompression(file, {
  //       maxSizeMB: options?.imageMaxSizeMB || 0.09, // 100KB
  //       maxWidthOrHeight: options?.imageMaxWidthOrHeight || 1024,
  //       useWebWorker: true,
  //     });

  //     // Compress thumbnail (10KB max)
  //     const thumbnailFile = await imageCompression(file, {
  //       maxSizeMB: options?.thumbnailMaxSizeMB || 0.01, // 10KB
  //       maxWidthOrHeight: options?.thumbnailMaxWidthOrHeight || 300,
  //       useWebWorker: true,
  //     });

  //     // Return processed files without saving
  //     const macImagePath = `dish-images/${Date.now()}-${file.name}`;
  //     const macThumbnailPath = `dish-images/thumbnails/${Date.now()}-${file.name}`;

  //     return {
  //       originalSize,
  //       imageSize: imageFile.size,
  //       thumbnailSize: thumbnailFile.size,
  //       macImagePath,
  //       macThumbnailPath,
  //       imageFile,
  //       thumbnailFile,
  //     };
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to transform image: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // Helper method to save file to Mac by triggering download
  // async saveFileToMac(file: File, directory: string): Promise<string> {
  //   try {
  //     // Create a timestamp for unique filenames
  //     const timestamp = Date.now();

  //     // Create organized filename with prefix for easy identification
  //     const isThumbnail = file.size <= 10240; // 10KB = 10 * 1024 bytes
  //     const prefix = isThumbnail ? 'dish_thumbnail' : 'dish_image';
  //     const fileName = `${prefix}_${timestamp}_${file.name}`;

  //     // Create a download link
  //     const downloadLink = document.createElement('a');
  //     downloadLink.href = URL.createObjectURL(file);
  //     downloadLink.download = fileName;

  //     // Trigger the download
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();
  //     document.body.removeChild(downloadLink);

  //     // Clean up the blob URL
  //     setTimeout(() => {
  //       URL.revokeObjectURL(downloadLink.href);
  //     }, 1000);

  //     const savedPath = `${directory}/${fileName}`;

  //     return savedPath;
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to save file to Mac: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }
}

// Create and export a singleton instance
// let supabaseServiceInstance: SupabaseService | null = null;

// export const getSupabaseService = (): SupabaseService | null => {
//   return SupabaseService.getInstance();
// };

// For backward compatibility, export the instance
export const supabaseService = SupabaseService.getInstance();

// Export the class for testing or custom instances
// export { SupabaseService };
