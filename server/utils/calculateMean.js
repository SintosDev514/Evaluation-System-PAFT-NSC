const calculateMean = (values = []) => {
  const numericValues = values.map((value) => Number(value) || 0);
  const total = numericValues.reduce((sum, value) => sum + value, 0);
  return numericValues.length > 0
    ? Number((total / numericValues.length).toFixed(2))
    : 0;
};

module.exports = { calculateMean };
