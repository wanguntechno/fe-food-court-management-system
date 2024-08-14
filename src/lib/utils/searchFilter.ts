const searchFilter = <T>(rows: T[], searchText: string, keys: (keyof T)[]): T[] => {
  if (!searchText) return rows;

  const lowercasedSearchText = searchText.toLowerCase();

  return rows.filter((row) =>
    keys.some((key) => String(row[key]).toLowerCase().includes(lowercasedSearchText)),
  );
};

export default searchFilter;
