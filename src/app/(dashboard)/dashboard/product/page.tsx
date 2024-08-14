'use client';

import Link from 'next/link';

import Button from '@mui/material/Button';

import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { CirclePlus } from 'lucide-react';

import DashboardTitle from '@/components/ui/dashboard/dashboard-title';
import getProducts from '@/lib/react-query/service/products/getProducts';
import { ProductType } from '@/lib/react-query/service/products/product.type';

import ProductTable from './_components/ProductTable';

const Page = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      href: '/dashboard/home',
    },
    {
      label: 'Product',
    },
  ];

  const { data, isLoading } = useQuery<ProductType[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 flex w-full items-center justify-between">
        <DashboardTitle title="Product List" breadcrumbs={breadcrumbs} />

        <Button
          startIcon={<CirclePlus />}
          variant="contained"
          color="black"
          LinkComponent={Link}
          href="/dashboard/product/new"
        >
          New Product
        </Button>
      </div>

      <ProductTable
        loading={isLoading}
        products={_.map(data || [], (elm) => ({ ...elm, id: elm.uuid }))}
        // products={data ? Array.from({ length: 20 }).map((__, i) => ({ ...data[0], id: i })) : []}
      />
    </div>
  );
};

export default Page;
