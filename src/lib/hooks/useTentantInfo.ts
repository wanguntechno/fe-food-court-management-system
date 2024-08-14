import { useQuery } from '@tanstack/react-query';

import UserType from '../react-query/service/auth/user.type';
import getTenantInfo from '../react-query/service/tenant/getTenantInfo';

const useTenantInfo = () => {
  return useQuery<UserType>({
    queryKey: ['tenant'],
    queryFn: getTenantInfo,
  });
};

export default useTenantInfo;
