const getYieldForPlant = (vegetable, environmentFactors) => {
  if (!environmentFactors) return vegetable.yield;

  let yieldWithSun = 0;
  let yieldTotal = 0;
  

  const sun = vegetable.factor.sun[environmentFactors.sun];
  const wind = vegetable.factor.wind[environmentFactors.wind];

  yieldWithSun = vegetable.yield * (1 + sun / 100);
  yieldTotal = yieldWithSun * (1 + wind / 100);

  return yieldTotal;
};

const getYieldForCrop = (vegetable, environmentFactors) => {
  let result = 0;
  result = Math.round(
    getYieldForPlant(vegetable.crop, environmentFactors) * vegetable.numCrops
  );
  return result;
};

const getTotalYield = (vegetable, environmentFactors) => {
  let getYield = 0;

  vegetable.crops.forEach((vegetable) => {
    getYield += getYieldForCrop(vegetable, environmentFactors);
  });
  return getYield;
};

const getCostsForCrop = (vegetable) => {
  return vegetable.crop.costs * vegetable.numCrops;
};

const getRevenueForCrop = (vegetable, environmentFactors) => {
  const yieldForCrop = getYieldForCrop(vegetable, environmentFactors);
  const total = vegetable.crop.salePrice * yieldForCrop;
  return total;
};

const getProfitForCrop = (vegetable, environmentFactors) => {
  const revenueForCrop = getRevenueForCrop(vegetable, environmentFactors);
  const costsForCrop = getCostsForCrop(vegetable, environmentFactors);
  const totalProfit = revenueForCrop - costsForCrop;
  return totalProfit;
};

const getTotalProfit = (vegetable, environmentFactors) => {
  let totalProfit = 0;
  vegetable.crops.forEach((vegetable) => {
    totalProfit += getProfitForCrop(vegetable, environmentFactors);
  });
  return totalProfit;
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalYield,
  getTotalProfit,
};
