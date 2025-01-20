// Function to convert object keys to camel case
const toCamelCase = (rows) => {
  return rows.map((row) => {
    // Convert each row's keys to camel case
    return Object.entries(row).reduce((acc, [key, value]) => {
      // Replace hyphens/underscores followed by a letter with the uppercase letter
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace('_', '')
      );
      acc[camelCase] = value; // Assign the value to the new camel case key
      return acc;
    }, {});
  });
};

export default toCamelCase;
