import fetchHelper from '../fetchHelper';

const deleteProduct = async (uuid: string) => {
  const result = await fetchHelper(`/selling-good/${uuid}`, 'DELETE');
  return result;
};

export default deleteProduct;
