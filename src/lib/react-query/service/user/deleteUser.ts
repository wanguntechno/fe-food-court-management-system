import fetchHelper from '../fetchHelper';

const deleteUser = async (uuid: string) => {
  const result = await fetchHelper(`/tenant/user/${uuid}`, 'DELETE');
  return result;
};

export default deleteUser;
