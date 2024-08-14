import { PhotoType } from '@/globals.type';

export interface ProductType {
  uuid: string;
  name: string;
  code: string;
  price: number;
  available_stock: number;
  description: string;
  created_at?: any;
  selling_price: number;
  photo: null | PhotoType;
  item_category: ItemCategoryType;
  quantity: number;
}

export interface ItemCategoryType {
  uuid: string;
  name: string;
  code: string;
  description: string;
  created_at: any;
}

export interface ProductCategoryType {
  uuid: string;
  name: string;
  code: string;
  description: string;
}
