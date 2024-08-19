'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import DashboardTitle from '@/components/ui/dashboard/dashboard-title';
import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import createProduct from '@/lib/react-query/service/products/createProduct';

import ProductForm from '../_components/ProductForm';
import { ProductFormType } from '../_utils/product-schema';

const Page = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      href: '/dashboard/home',
    },
    {
      label: 'Product',
      href: '/dashboard/product',
    },
    {
      label: 'New Product',
    },
  ];

  const queryClient = getQueryCLient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: [TAGS.PRODUCT],
    mutationFn: createProduct,
    onSuccess: () => {
      enqueueSnackbar('Product succesfully created', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: [TAGS.PRODUCT] });
      router.push('/dashboard/product');
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar('Failed to create product', { variant: 'error' });
    },
  });

  const handleSubmit = (data: ProductFormType) => {
    mutate(data);
  };

  return (
    <main>
      <DashboardTitle title="Create a new product" breadcrumbs={breadcrumbs} />
      <ProductForm loading={isPending} onSubmit={handleSubmit} />
    </main>
  );
};

export default Page;
