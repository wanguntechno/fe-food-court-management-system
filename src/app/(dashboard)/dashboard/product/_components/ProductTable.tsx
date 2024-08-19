import { memo, useMemo, useState } from 'react';

import Link from 'next/link';

import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';

import { useMutation } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import dayjs from 'dayjs';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';

import ImageContainer from '@/components/ImageContainer';
import DataGrid from '@/components/mui/data-grid';
import Menu from '@/components/mui/menu';
import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import deleteProduct from '@/lib/react-query/service/products/deleteProduct';
import { ProductType } from '@/lib/react-query/service/products/product.type';
import formatToRp from '@/lib/utils/formatToRp';
import searchFilter from '@/lib/utils/searchFilter';

import ProductTableToolbar, { ProductTableToolbarProps } from './ProductTableToolbar';

interface Props {
  products: ProductType[];
  loading?: boolean;
}

const ProductTable = ({ products, loading }: Props) => {
  const queryClient = getQueryCLient();

  const { mutate } = useMutation({
    mutationKey: [TAGS.PRODUCT],
    mutationFn: (uuid: string) => deleteProduct(uuid),
    onSuccess: () => {
      enqueueSnackbar('Product successfully deleted', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: [TAGS.PRODUCT] });
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar('Failed to delete product', { variant: 'error' });
    },
  });

  const columns: GridColDef<(typeof products)[number]>[] = [
    {
      field: 'name',
      headerName: 'Product',
      hideable: false,
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="flex items-center gap-3 py-3">
            <ImageContainer
              src={row.photo?.url || ''}
              alt={row.name}
              className="size-16 rounded-lg"
            />
            <Typography variant="body1">
              {row.name}
              <br />
              <Typography variant="caption">{row.item_category.name}</Typography>
            </Typography>
          </div>
        );
      },
    },
    {
      field: 'created_at',
      headerName: 'Created at',
      width: 160,
      valueGetter: (value) => (value ? dayjs(value * 1000).format('DD MMM YYYY') : '-'),
    },
    {
      field: 'available_stock',
      headerName: 'Stock',
      width: 160,
    },
    {
      field: 'price',
      headerName: 'Base Price',
      width: 160,
      valueGetter: (value) => formatToRp(value),
    },
    {
      field: 'selling_price',
      headerName: 'Selling Price',
      width: 160,
      valueGetter: (value) => formatToRp(value),
    },
    {
      field: 'uuid',
      headerName: '',
      width: 50,
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Menu
            Button={IconButton}
            buttonProps={{
              children: <EllipsisVertical size={20} />,
            }}
            PaperProps={{
              className: 'min-w-40',
            }}
          >
            <Link href={`/dashboard/product/${params.value}`}>
              <MenuItem>
                <ListItemIcon>
                  <Pencil size={20} />
                </ListItemIcon>
                Edit
              </MenuItem>
            </Link>
            <MenuItem className="text-red-500" onClick={() => mutate(params.value)}>
              <ListItemIcon>
                <Trash2 size={20} className="text-red-500" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        );
      },
    },
  ];

  const [searchText, setSearchText] = useState('');
  const debounceSearch = useDebounce(searchText, 300);

  const filteredRows = useMemo(() => {
    return searchFilter(products, debounceSearch, ['name']);
  }, [debounceSearch, products]);

  return (
    <div className="flex h-1 flex-grow flex-col">
      <DataGrid
        rows={filteredRows}
        columns={columns}
        loading={loading}
        slotProps={{
          toolbar: {
            onSearch: (val) => setSearchText(val),
          } as ProductTableToolbarProps,
        }}
        slots={{
          toolbar: ProductTableToolbar as any,
        }}
      />
    </div>
  );
};

export default memo(ProductTable);
