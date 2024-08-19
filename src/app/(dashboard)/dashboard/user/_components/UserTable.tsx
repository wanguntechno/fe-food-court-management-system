import { memo, useMemo, useState } from 'react';

import Link from 'next/link';

import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';

import { useMutation } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';

import DataGrid from '@/components/mui/data-grid';
import Menu from '@/components/mui/menu';
import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import deleteUser from '@/lib/react-query/service/user/deleteUser';
import { UserType } from '@/lib/react-query/service/user/user.type';
import searchFilter from '@/lib/utils/searchFilter';

import UserTableToolbar, { UserTableToolbarProps } from './UserTableToolbar';

interface Props {
  users: UserType[];
  loading?: boolean;
}

const UserTable = ({ users, loading }: Props) => {
  const queryClient = getQueryCLient();

  const { mutate } = useMutation({
    mutationKey: [TAGS.USER],
    mutationFn: (uuid: string) => deleteUser(uuid),
    onSuccess: () => {
      enqueueSnackbar('User successfully deleted', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: [TAGS.USER] });
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar('Failed to delete user', { variant: 'error' });
    },
  });

  const columns: GridColDef<(typeof users)[number]>[] = [
    {
      field: 'employee_number',
      headerName: 'Number',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      valueGetter: (_, row) => row.user.username,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 160,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
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
            <Link href={`/dashboard/user/${params.value}`}>
              <MenuItem>
                <ListItemIcon>
                  <Pencil size={20} />
                </ListItemIcon>
                Edit
              </MenuItem>
            </Link>
            <MenuItem
              className="text-red-500"
              onClick={() => mutate(params.value)}
              disabled={!!params.row.is_master}
            >
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
    return searchFilter(users, debounceSearch, ['name']);
  }, [debounceSearch, users]);

  return (
    <div className="flex h-1 flex-grow flex-col">
      <DataGrid
        rows={filteredRows}
        columns={columns}
        loading={loading}
        slotProps={{
          toolbar: {
            onSearch: (val) => setSearchText(val),
          } as UserTableToolbarProps,
        }}
        slots={{
          toolbar: UserTableToolbar as any,
        }}
      />
    </div>
  );
};

export default memo(UserTable);
