import { z } from 'zod';

import { ProductType } from '@/lib/react-query/service/products/product.type';

export interface OrderFieldType extends Omit<ProductType, 'uuid' | 'item_category'> {
  product_uuid: string;
  quantity: number;
}

export interface OrderFormType {
  fields: OrderFieldType[];
}

export const OrderDefaultValue: OrderFieldType = {
  product_uuid: '',
  quantity: 1,
  name: '',
  price: 0,
  photo: null,
  available_stock: 0,
  description: '',
  code: '',
  selling_price: 0,
};

export const orderFieldSchema = z.object({
  product_uuid: z.string(),
  quantity: z.number(),
});

export const orderFormSchema = z.object({
  fields: z.array(orderFieldSchema),
});
