import { memo, useMemo, useState } from 'react';

import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useDebounce } from '@uidotdev/usehooks';
import dayjs from 'dayjs';

import ImageContainer from '@/components/ImageContainer';
import { ProductType } from '@/lib/react-query/service/products/product.type';
import formatToRp from '@/lib/utils/formatToRp';
import searchFilter from '@/lib/utils/searchFilter';

import ProductTableToolbar, { ProductTableToolbarProps } from './ProductTableToolbar';

interface Props {
  products: ProductType[];
  loading?: boolean;
}

const ProductTable = ({ products, loading }: Props) => {
  const columns: GridColDef<(typeof products)[number]>[] = [
    {
      field: 'name',
      headerName: 'Product',
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
      valueGetter: (value) => (value ? dayjs(value).format('DD MMM YYYY') : '-'),
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
      filterable: false,
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
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        rowHeight={88}
        pageSizeOptions={[5, 10, 20, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'linear-progress',
          },
          toolbar: {
            onSearch: (val) => setSearchText(val),
          } as ProductTableToolbarProps,
        }}
        slots={{
          toolbar: ProductTableToolbar as any,
        }}
        sx={{ borderRadius: '0.6rem' }}
        className="flex-grow"
      />
    </div>
  );
};

export default memo(ProductTable);
