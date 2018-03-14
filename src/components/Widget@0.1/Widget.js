import React, { Fragment } from 'react';
import './style.css';

const points = [
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

const testPoints = [
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

points.map((points, i, arr) => {
  if (i > 0) {
    points[0] = i * Math.round(500 / 11);
    points[1] = 300 - points[1];
  }
  if (i === arr.length - 1) {
    points[1] = 300;
  }
  return points;
});
// console.log('points', points);
class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.height = 300;
    this.width = 500;
    this.dots = 20;
    this.rangeY = 0;
    this.rangeX = this.width / this.dots;
    this.firstPrice = null;
    this.priceArray = [];
    this.dotsArray = this.initializeDotsArray();
  }
  state = {
    currency: '',
    growth: null,
    price: null,
    minY: null,
    maxY: null,
    dotsArray: [],
  };

  initializeDotsArray() {
    const initial = Array.from({ length: this.dots }).map((a, i) => [
      (i + 1) * this.rangeX,
      this.height / 1.2,
    ]);
    return initial;
  }

  componentDidMount() {
    const ws = new WebSocket('ws://coins-stream.demo.javascript.ninja');
    ws.onopen = () => {
      console.log('subscribe');
      ws.send(JSON.stringify({ type: 'subscribe', currency: 'BTC' }));
    };
    ws.onmessage = e => {
      const { price, currency } = JSON.parse(e.data);
      if (this.firstPrice === null) {
        this.firstPrice = price;
      }

      const growth = parseFloat(((price - this.firstPrice) / this.firstPrice * 100).toFixed(2));

      if (this.priceArray.length === this.dots) {
        this.priceArray.shift();
      }
      const priceDiff =
        this.priceArray.length > 0 ? this.priceArray[this.priceArray.length - 1] - price : 0;
      this.priceArray.push(price);

      const maxY = Math.max(...this.priceArray);
      const minY = Math.min(...this.priceArray);
      this.rangeY = maxY - minY;

      const absPriceDiff = Math.abs(priceDiff);

      let scaledYDot;
      if (this.rangeY === 0) {
        scaledYDot = 0;
      } else {
        scaledYDot = this.height / 1.2 / this.rangeY * absPriceDiff;
      }
      console.log({ scaledYDot });
      const heightMinusScaled = this.height / 1.2 - scaledYDot;

      // shift the Y values a step back and record the incoming price
      const newArr = this.dotsArray.map((dots, i, arr) => {
        if (i < arr.length - 1) {
          dots[1] = arr[i + 1][1];
        } else if (i === arr.length - 1) {
          dots[1] = heightMinusScaled;
        }
        return dots;
      });
      newArr.unshift([0, this.height / 1.2]);
      newArr.unshift([0, this.height]);
      newArr.push([(newArr.length - 2) * this.rangeX, this.height]);
      this.setState(({ dotsArray }) => ({
        currency,
        growth,
        price: parseFloat(price).toFixed(2),
        minY,
        maxY,
        priceDiff: priceDiff,
        dotsArray: newArr,
      }));
    };
  }
  flatten(list) {
    const newList = [...list];
    return newList.reduce((a, b) => a.concat(Array.isArray(b) ? this.flatten(b) : b), []);
  }

  render() {
    const { dotsArray, price, growth, currency, minY, maxY, priceDiff } = this.state;
    console.log(dotsArray);
    const priceColor = priceDiff > 0 ? 'red' : 'green';
    const flattened = this.flatten(dotsArray);
    let incomingPriceCoords = [];
    if (dotsArray.length !== 0) {
      incomingPriceCoords = dotsArray[dotsArray.length - 2];
      console.log(incomingPriceCoords);
    }
    // console.log({ flattened });
    const viewBox = `0 0 ${this.width} ${this.height}`;
    return (
      <div className="price-widget">
        <svg viewBox={viewBox} className="chart">
          <polygon className="chart-polygon" points={flattened} />
          {dotsArray.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" />)}
          <text x="0" y="35" className="currency">
            {currency}
          </text>
          <text x="0" y="75" className="price-growth">
            <tspan className={`price ${priceColor}`}>{price}</tspan>
            <tspan className="growth">{growth ? ` (${growth})` : ''}</tspan>
          </text>
          {/* {incomingPriceCoords && (
            <circle cx={incomingPriceCoords[0] - 10} cy={incomingPriceCoords[1]} r="10" />
          )} */}
          {dotsArray.map(([x, y], i) => <line key={i} x1={x} y1={300} x2={x} y2={295} />)}
        </svg>
      </div>
    );
  }
}

export default Widget;
