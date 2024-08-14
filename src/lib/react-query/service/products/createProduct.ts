import { ProductFormType } from '@/app/(dashboard)/dashboard/product/_utils/product-schema';
import parseObjectRequest from '@/lib/utils/parseObjectRequest';

import fetchHelper from '../fetchHelper';

const createProduct = async (data: ProductFormType) => {
  const result = await fetchHelper('/selling-good', 'POST', await parseObjectRequest(data));

  return result;
};

export default createProduct;
