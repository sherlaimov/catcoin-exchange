const points = [
  [0, 300],
  [0, 150],
  [50, 150],
  [100, 0],
  [150, 100.96153846152433],
  [200, 118.1818181818282],
  [250, 113.63636363635737],
  [300, 115.90909090909278],
  [350, 123.41772151899302],
  [400, 134.659090909068],
  [450, 138.8011496607638],
  [500, 150],
  [500, 300],
];
const basePrice = 9201.1;
const priceRange = 20;
const min = basePrice - priceRange;
const max = basePrice + priceRange;
function generateRandomInteger(min, max) {
  // return Math.floor(min + Math.random()*(max+1 - min))
  return min + Math.random() * (max + 1 - min);
}
const prices = Array.from({ length: 20 }).map(price => ({
  price: generateRandomInteger(min, max),
  currency: 'BTC',
}));
