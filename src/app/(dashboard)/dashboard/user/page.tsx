'use client';

import Link from 'next/link';

import Button from '@mui/material/Button';

import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { CirclePlus } from 'lucide-react';

import DashboardTitle from '@/components/ui/dashboard/dashboard-title';
import TAGS from '@/constant/tags';
import getUsers from '@/lib/react-query/service/user/getUsers';
import { UserType } from '@/lib/react-query/service/user/user.type';

import UserTable from './_components/UserTable';

const Page = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      href: '/dashboard/home',
    },
    {
      label: 'User',
    },
  ];

  const { data, isLoading } = useQuery<UserType[]>({
    queryKey: [TAGS.USER],
    queryFn: getUsers,
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 flex w-full items-center justify-between">
        <DashboardTitle title="User List" breadcrumbs={breadcrumbs} />

        <Button
          startIcon={<CirclePlus />}
          variant="contained"
          color="black"
          LinkComponent={Link}
          href="/dashboard/user/new"
        >
          New User
        </Button>
      </div>

      <UserTable
        loading={isLoading}
        users={_.map(data || [], (elm) => ({ ...elm, id: elm.uuid }))}
      />
    </div>
  );
};

export default Page;
