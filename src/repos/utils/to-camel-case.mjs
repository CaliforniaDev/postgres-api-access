const toCamelCase = (rows) => {
  return rows.map((row) => {
    return Object.entries(row).reduce((acc, [key, value]) => {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace('_', ''),
      );
      acc[camelCase] = value;
      return acc;
    }, {});
  });
};

export default toCamelCase;
