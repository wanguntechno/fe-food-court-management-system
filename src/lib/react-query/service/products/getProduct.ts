import fetchHelper from '../fetchHelper';

const getProduct = async (uuid: string) => {
  const result = await fetchHelper(`/selling-good/${uuid}`);
  return result.data;
};

export default getProduct;
