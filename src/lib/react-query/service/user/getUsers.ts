import fetchHelper from '../fetchHelper';

const getUsers = async () => {
  const result = await fetchHelper('/tenant/user');
  return result.data;
};

export default getUsers;
