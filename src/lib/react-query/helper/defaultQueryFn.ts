import type { QueryKey } from '@tanstack/react-query';

import objectToQueryString from '@/lib/utils/objectToQueryKey';

import fetchHelper from '../service/fetchHelper';

const defaultQueryFn = async <T>({
  queryKey,
}: {
  queryKey: QueryKey;
  meta: Record<string, unknown> | undefined;
}) => {
  const response = await fetchHelper<T>(
    `${queryKey[0]}?${objectToQueryString({
      regPatient: 158638,
      branch: 'SAHARJO',
    })}`,
  );

  return response;
};

export default defaultQueryFn;
