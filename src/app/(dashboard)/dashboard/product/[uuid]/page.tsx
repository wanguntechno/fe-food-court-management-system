'use client';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import DashboardTitle from '@/components/ui/dashboard/dashboard-title';
import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import getProduct from '@/lib/react-query/service/products/getProduct';
import { ProductType } from '@/lib/react-query/service/products/product.type';
import updateProduct from '@/lib/react-query/service/products/updateProduct';

import ProductForm from '../_components/ProductForm';
import { ProductFormType } from '../_utils/product-schema';

const Page = ({ params: { uuid } }: { params: { uuid: string } }) => {
  const router = useRouter();
  const queryClient = getQueryCLient();

  const { data: product } = useQuery<ProductType>({
    queryKey: [TAGS.PRODUCT, uuid],
    queryFn: () => getProduct(uuid),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [TAGS.PRODUCT],
    mutationFn: (data: ProductFormType) => updateProduct(uuid, data),
    onSuccess: () => {
      enqueueSnackbar('Product successfully updated', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: [TAGS.PRODUCT] });
      router.push('/dashboard/product');
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar('Failed to update product', { variant: 'error' });
    },
  });

  const handleSubmit = (data: ProductFormType) => {
    let newData = data;
    if (typeof newData.file_storage_uuid === 'string') {
      newData = {
        ...data,
        file_storage_uuid: product?.photo?.uuid || '',
      };
    }
    mutate(newData);
  };

  const breadcrumbs = useMemo(() => {
    return [
      {
        label: 'Dashboard',
        href: '/dashboard/home',
      },
      {
        label: 'Product',
        href: '/dashboard/product',
      },
      {
        label: product?.name || 'Product',
      },
    ];
  }, [product]);

  return (
    <main>
      <DashboardTitle title="Edit product" breadcrumbs={breadcrumbs} />
      <ProductForm
        initialValue={
          product && {
            available_stock: product.available_stock,
            code: product.code,
            description: product.description,
            file_storage_uuid: product.photo?.url || '',
            item_category_uuid: product.item_category.uuid,
            name: product.name,
            price: Number(product.price),
          }
        }
        loading={isPending}
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default Page;
