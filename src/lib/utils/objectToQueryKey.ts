const objectToQueryString = (obj: object) =>
  Object.entries(obj)
    .map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent((value || '') as string)}`,
    )
    .join('&');

export default objectToQueryString;
