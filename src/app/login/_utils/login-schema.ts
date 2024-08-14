import { z } from 'zod';

export interface LoginFormType {
  username: string;
  password: string;
}

export const loginDefault: LoginFormType = {
  username: '',
  password: '',
};

export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: 'Username is required' }),
  password: z.string().trim().min(1, { message: 'Password is required' }),
});
