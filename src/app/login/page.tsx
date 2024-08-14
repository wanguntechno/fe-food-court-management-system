'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import PasswordInput from '@/components/ui/form/password-input';
import TextInput from '@/components/ui/form/text-input';
import login from '@/lib/react-query/service/auth/login';

import { loginDefault, LoginFormType, loginSchema } from './_utils/login-schema';

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { control, handleSubmit } = useForm<LoginFormType>({
    defaultValues: loginDefault,
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      setError('');
      return login(username, password);
    },
    onSuccess: (data) => {
      setCookie('token', data.data.token);
      enqueueSnackbar(data.message, { variant: 'success' });
      router.push('/');
    },
    onError: (err) => {
      console.error('Error', err);
      setError(err.message);
    },
  });

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-white to-primary-200/75 shadow-black/75 drop-shadow-lg">
      <div className="flex min-w-96 flex-col items-center rounded-xl bg-white p-6">
        <Typography variant="h5">Sign in to your account</Typography>

        <form
          className="mt-10 flex w-full flex-col gap-4"
          onSubmit={handleSubmit((d) => {
            mutate(d);
          })}
        >
          <TextInput control={control} fullWidth name="username" label="Username" />
          <PasswordInput control={control} fullWidth name="password" />

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <LoadingButton loading={isPending} type="submit" variant="outlined" className="mt-4 p-3">
            Sign In
          </LoadingButton>
        </form>
      </div>
    </main>
  );
};

export default Page;
