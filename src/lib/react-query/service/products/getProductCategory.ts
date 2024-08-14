import fetchHelper from '../fetchHelper';

const getProductCategory = async () => {
  const result = await fetchHelper('/item-category');
  return result.data;
};

export default getProductCategory;
