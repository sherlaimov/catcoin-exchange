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
const testPoints = [
  [0, 300],
  [0, 120],
  [20, 60],
  [40, 80],
  [60, 20],
  [80, 80],
  [100, 80],
  [120, 60],
  [140, 100],
  [160, 90],
  [180, 120],
  [200, 0],
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


// points.map((points, i, arr) => {
//   if (i > 0) {
//     points[0] = i * Math.round(500 / 11);
//     points[1] = 300 - points[1];
//   }
//   if (i === arr.length - 1) {
//     points[1] = 300;
//   }
//   return points;
// });