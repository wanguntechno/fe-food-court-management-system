import { useQuery } from '@tanstack/react-query';

import AuthType from '../react-query/service/auth/auth.type';
import getuserInfo from '../react-query/service/auth/getUserInfo';

const useUserInfo = () => {
  return useQuery<AuthType>({
    queryKey: ['userInfo'],
    queryFn: getuserInfo,
  });
};

export default useUserInfo;
