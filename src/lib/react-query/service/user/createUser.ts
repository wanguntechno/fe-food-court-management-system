import { UserFormType } from '@/app/(dashboard)/dashboard/user/_utils/user-schema';

import fetchHelper from '../fetchHelper';

const createUser = async (data: UserFormType) => {
  const result = await fetchHelper('/tenant/user', 'POST', data);
  return result;
};

export default createUser;
