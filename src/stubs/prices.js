const basePrice = 9201.1;
const priceRange = 20;
const min = basePrice - priceRange;
const max = basePrice + priceRange;
function generateRandomInteger(_min, _max) {
  // return Math.floor(_min + Math.random()*(_max+1 - _min))
  return _min + Math.random() * (_max + 1 - _min);
}
const prices = Array.from({ length: 20 }).map(price => ({
  price: generateRandomInteger(min, max),
  currency: 'BTC'
}));

const priceWidgetProps = {
  width: 500,
  height: 300,
  dotsArray: prices,
  price: basePrice,
  growth: 0.2,
  currency: 'BTC',
  minY: basePrice + 2,
  maxY: basePrice - 2,
  priceDiff: 0.4,
  baseLineFactor: 1.2
};

export { priceWidgetProps };

export default prices;
