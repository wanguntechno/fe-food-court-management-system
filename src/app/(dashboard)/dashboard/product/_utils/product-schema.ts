import { z } from 'zod';

export interface ProductFormType {
  item_category_uuid: string;
  file_storage_uuid: string;
  name: string;
  price: number;
  available_stock: number;
  description: string;
  code: string;
}

export const productFormDefault: ProductFormType = {
  item_category_uuid: '',
  file_storage_uuid: '',
  name: '',
  price: 0,
  available_stock: 0,
  description: '',
  code: '',
};

export const productFormSchema = z.object({
  item_category_uuid: z.string().trim().min(1, { message: 'Item category is required' }),
  file_storage_uuid: z.union([
    z.string({ message: 'Image is required' }),
    z.instanceof(File, { message: 'Images is required' }).refine(
      (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

        return allowedTypes.includes(file.type) && file.size <= maxSizeInBytes;
      },
      {
        message:
          'Invalid file. Only JPEG/PNG images are allowed and file size should not exceed 5MB.',
      },
    ),
  ]),
  name: z.string().trim().min(1, { message: 'Name is required' }),
  price: z.number().min(1, { message: 'Price is required' }),
  available_stock: z.number().min(1, { message: 'Available stock is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  code: z.string().trim().min(1, { message: 'Code is required' }),
});
