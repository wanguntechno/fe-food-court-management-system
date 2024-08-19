import { z } from 'zod';

export interface UserFormType {
  username: string;
  name: string;
  password: string;
  password_confirmation: string;
  address: string;
  phone_number: string;
  bank_account_name: string;
  bank_account_number: string;
}

export const UserFormDefault: UserFormType = {
  username: '',
  name: '',
  password: '',
  password_confirmation: '',
  address: '',
  phone_number: '',
  bank_account_name: '',
  bank_account_number: '',
};

export const userFormSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(1, 'Password is required'),
    password_confirmation: z.string().min(1, 'Password confirmation is required'),
    address: z.string().min(1, 'Address is required'),
    phone_number: z.string().min(1, 'Phone number is required'),
    bank_account_name: z.string().min(1, 'Bank account name is required'),
    bank_account_number: z.string().min(1, 'Bank account number is required'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match',
    path: ['password_confirmation'],
  });
