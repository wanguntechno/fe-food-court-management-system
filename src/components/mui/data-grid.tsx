import { DataGrid as MuiDataGrid, DataGridProps } from '@mui/x-data-grid';

import { ChevronDown, ChevronUp, Ellipsis, Eye, EyeOff, Filter } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props extends DataGridProps {}

const CustomIcon = (IconComponent: any) =>
  function CustomIconWrapper(props: any) {
    return <IconComponent size={20} {...props} />;
  };

const DataGrid = ({ className, slotProps, slots, ...props }: Props) => {
  return (
    <MuiDataGrid
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
      slotProps={{
        loadingOverlay: {
          variant: 'linear-progress',
          noRowsVariant: 'linear-progress',
        },
        columnsManagement: {
          getTogglableColumns: () =>
            props.columns.filter((col) => !col.disableColumnMenu).map((col) => col.field),
        },
        ...slotProps,
      }}
      slots={{
        columnSortedAscendingIcon: CustomIcon(ChevronUp),
        columnMenuSortAscendingIcon: CustomIcon(ChevronUp),
        columnSortedDescendingIcon: CustomIcon(ChevronDown),
        columnMenuSortDescendingIcon: CustomIcon(ChevronDown),
        columnMenuManageColumnsIcon: CustomIcon(Eye),
        columnMenuHideIcon: CustomIcon(EyeOff),
        columnMenuFilterIcon: CustomIcon(Filter),
        columnFilteredIcon: CustomIcon(Filter),
        columnMenuIcon: CustomIcon(Ellipsis),
        ...slots,
      }}
      sx={{ borderRadius: '0.6rem' }}
      className={cn('flex-grow', className)}
      {...props}
    />
  );
};

export default DataGrid;
