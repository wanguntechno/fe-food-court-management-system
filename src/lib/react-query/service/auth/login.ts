import fetchHelper from '../fetchHelper';

const login = async (username: string, password: string) => {
  const result = await fetchHelper('/do-login', 'POST', { username, password });
  return result;
};

export default login;
