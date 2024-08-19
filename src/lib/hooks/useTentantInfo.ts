import { useQuery } from '@tanstack/react-query';

import AuthType from '../react-query/service/auth/auth.type';
import getTenantInfo from '../react-query/service/tenant/getTenantInfo';

const useTenantInfo = () => {
  return useQuery<AuthType>({
    queryKey: ['tenant'],
    queryFn: getTenantInfo,
  });
};

export default useTenantInfo;
