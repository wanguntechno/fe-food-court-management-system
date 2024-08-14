import fetchHelper from '../fetchHelper';

const getProducts = async () => {
  const result = await fetchHelper('/selling-good');
  return result.data;
};

export default getProducts;
