import { useEffect } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormCard from '@/components/ui/form/form-card';
import PasswordInput from '@/components/ui/form/password-input';
import TelInput from '@/components/ui/form/telephone-input';
import TextInput from '@/components/ui/form/text-input';

import { UserFormDefault, userFormSchema, UserFormType } from '../_utils/user-schema';

interface Props {
  initialValue?: UserFormType;
  onSubmit: SubmitHandler<UserFormType>;
  loading?: boolean;
}

const UserForm = ({ initialValue, onSubmit, loading }: Props) => {
  const { control, handleSubmit, reset } = useForm<UserFormType>({
    defaultValues: initialValue || UserFormDefault,
    resolver: zodResolver(userFormSchema),
  });

  useEffect(() => {
    if (initialValue) {
      reset(initialValue); // Update the form values when initialValue changes
    }
  }, [initialValue, reset]);

  return (
    <form className="!max-w-none form-container" onSubmit={handleSubmit(onSubmit)}>
      <FormCard title="User Information" subTitle="User attributes...">
        <div className="flex gap-4">
          <TextInput fullWidth name="name" label="Name" control={control} />
          <TextInput fullWidth name="username" label="Username" control={control} />
        </div>
        <div className="flex gap-4">
          <PasswordInput fullWidth name="password" label="Password" control={control} />
          <PasswordInput
            fullWidth
            name="password_confirmation"
            label="Password confirmation"
            control={control}
          />
        </div>
        <div className="flex gap-4">
          <TextInput fullWidth name="address" label="Address" control={control} />
          <TelInput fullWidth name="phone_number" label="Phone" control={control} />
        </div>
        <div className="flex gap-4">
          <TextInput
            fullWidth
            name="bank_account_name"
            label="Bank account name"
            control={control}
          />
          <TextInput
            fullWidth
            name="bank_account_number"
            label="Bank account number"
            control={control}
          />
        </div>
      </FormCard>

      <LoadingButton
        loading={loading}
        type="submit"
        variant="contained"
        color="black"
        className="ml-auto w-fit"
      >
        {initialValue ? 'Save Changes' : 'Create User'}
      </LoadingButton>
    </form>
  );
};

export default UserForm;
