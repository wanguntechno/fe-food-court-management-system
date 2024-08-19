import { ProductFormType } from '@/app/(dashboard)/dashboard/product/_utils/product-schema';
import parseObjectRequest from '@/lib/utils/parseObjectRequest';

import fetchHelper from '../fetchHelper';

const updateProduct = async (uuid: string, data: ProductFormType) => {
  const result = await fetchHelper(`/selling-good/${uuid}`, 'PUT', await parseObjectRequest(data));

  return result;
};

export default updateProduct;
