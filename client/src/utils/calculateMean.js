export const calculateMean = (values = []) => {
  const numeric = values.map((value) => Number(value) || 0);
  if (!numeric.length) return 0;
  const total = numeric.reduce((sum, current) => sum + current, 0);
  return Number((total / numeric.length).toFixed(2));
};
