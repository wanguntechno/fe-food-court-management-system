import fetchHelper from '../fetchHelper';

const getTenantInfo = async () => {
  const response = await fetchHelper('/tenant');
  return response.data;
};
export default getTenantInfo;
