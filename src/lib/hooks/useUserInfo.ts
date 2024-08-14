import { useQuery } from '@tanstack/react-query';

import getuserInfo from '../react-query/service/auth/getUserInfo';
import UserType from '../react-query/service/auth/user.type';

const useUserInfo = () => {
  return useQuery<UserType>({
    queryKey: ['userInfo'],
    queryFn: getuserInfo,
  });
};

export default useUserInfo;
