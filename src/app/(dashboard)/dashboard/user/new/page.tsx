'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import DashboardTitle from '@/components/ui/dashboard/dashboard-title';
import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import createUser from '@/lib/react-query/service/user/createUser';

import UserForm from '../_components/UserForm';
import { UserFormType } from '../_utils/user-schema';

const Page = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      href: '/dashboard/home',
    },
    {
      label: 'User',
      href: '/dashboard/user',
    },
    {
      label: 'New User',
    },
  ];

  const queryCLient = getQueryCLient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: [TAGS.USER],
    mutationFn: createUser,
    onSuccess: () => {
      enqueueSnackbar('User succesfully created', { variant: 'success' });
      queryCLient.invalidateQueries({ queryKey: [TAGS.USER] });
      router.push('/dashboard/user');
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar('Failed to create user', { variant: 'error' });
    },
  });

  const handleSubmit = (data: UserFormType) => {
    mutate(data);
  };

  return (
    <main>
      <DashboardTitle title="Create a new user" breadcrumbs={breadcrumbs} />
      <UserForm loading={isPending} onSubmit={handleSubmit} />
    </main>
  );
};

export default Page;
