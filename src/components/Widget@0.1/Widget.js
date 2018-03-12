import React, { Fragment } from 'react';

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
    this.rangeX = this.width / this.dots + 2;
    this.firstPrice = null;
    this.priceArray = [];
    this.dotsArray = this.initializeDotsArray();
    this.cnt = 0;
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
      this.height,
    ]);
    // debugger;
    initial.unshift([0, this.height / 2]);
    initial.unshift([0, this.height]);
    initial.push([initial.length * this.rangeX, this.height]);
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

      if (this.priceArray.length === 10) {
        this.priceArray.shift();
      }
      this.priceArray.push(price);

      const maxY = Math.max(...this.priceArray);
      const minY = Math.min(...this.priceArray);
      this.rangeY = maxY - minY;
      this.setState(prevState => ({
        currency,
        growth,
        price: parseFloat(price),
        minY,
        maxY,
        priceDiff: parseFloat(prevState.price - price),
      }));

      const priceDiff = Math.abs(this.state.priceDiff);
      console.log(priceDiff === 0);
      let scaledYDot;
      if (this.rangeY === 0) {
        scaledYDot = 0;
      } else {
        scaledYDot = 150 / this.rangeY * priceDiff;
      }
      console.log({ scaledYDot });
      const heightMinusScaled = 150 - scaledYDot;
      if (this.cnt < 9) {
        this.dotsArray[this.cnt + 2][1] = heightMinusScaled;
        this.cnt += 1;
        this.setState(({ dotsArray }) => ({
          dotsArray: this.dotsArray,
        }));
      } else {
        console.log('Counter =>', this.cnt);
        const newArr = this.dotsArray.map((dots, i, arr) => {
          if (i > 1 && i < arr.length - 3) {
            dots[1] = arr[i + 1][1];
            return dots;
          } else if (i === arr.length - 3) {
            dots[1] = heightMinusScaled;
            return dots;
          } else {
            return dots;
          }
        });
        this.setState(({ dotsArray }) => ({
          dotsArray: newArr,
        }));
        // console.log(newArr);
      }
    };
  }

  calculatePoints() {}

  render() {
    console.log(this.state.dotsArray);
    const { dotsArray, price, growth } = this.state;
    const cx = dotsArray.length > 0 ? dotsArray[10][0] : 10;
    const cy = dotsArray.length > 0 ? dotsArray[10][1] : 10;
    const viewBox = `0 0 ${this.width} ${this.height}`;
    return (
      <Fragment>
        <div>
          <svg viewBox={viewBox} className="chart">
            <text x="0" y="35" fontFamily="Verdana" fontSize="35">
              {price}
            </text>
            <circle cx={cx} cy={cy} r="10" fill="#C9327E" />
            <polygon fill="steelblue" stroke="#0074d9" strokeWidth="1" points={dotsArray} />
          </svg>
        </div>
        <div>
          <svg viewBox={viewBox} className="chart2">
            <polygon fill="none" stroke="#0074d9" strokeWidth="2" points={points} />
          </svg>
        </div>
      </Fragment>
    );
  }
}

export default Widget;
