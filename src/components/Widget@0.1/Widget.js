import React from 'react';
import PriceWidget from './PriceWidget';

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.height = 300;
    this.width = 500;
    this.dots = 40;
    this.rangeY = 0;
    this.rangeX = this.width / this.dots;
    this.firstPrice = null;
    this.priceArray = [];
    this.baseLineFactor = 1.2;
    this.dotsArray = this.initializeDotsArray();
    this.state = {
      currency: '',
      growth: null,
      price: null,
      minY: null,
      maxY: null,
      dotsArray: []
    };
  }

  initializeDotsArray() {
    const initial = Array.from({ length: this.dots }).map((a, i) => [
      (i + 1) * this.rangeX,
      this.height / this.baseLineFactor
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
      console.log(typeof price);
      this.calculateWidgetData({ price, currency });
    };
  }

  calculateWidgetData({ price, currency }) {
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
      scaledYDot = this.height / this.baseLineFactor / this.rangeY * absPriceDiff;
    }
    const heightMinusScaled = this.height / this.baseLineFactor - scaledYDot;

    // shift the Y values a step back and record the incoming price
    const newArr = this.dotsArray.map((dots, i, arr) => {
      if (i < arr.length - 1) {
        dots[1] = arr[i + 1][1];
      } else if (i === arr.length - 1) {
        dots[1] = heightMinusScaled;
      }
      return dots;
    });
    newArr.unshift([0, this.height / this.baseLineFactor]);
    newArr.unshift([0, this.height]);
    newArr.push([(newArr.length - 2) * this.rangeX, this.height]);

    this.setState({
      currency,
      growth,
      price: parseFloat(price).toFixed(2),
      minY,
      maxY,
      priceDiff,
      dotsArray: newArr
    });
  }

  render() {
    const { dotsArray, price, growth, currency, minY, maxY, priceDiff } = this.state;

    return (
      <PriceWidget
        dotsArray={dotsArray}
        price={price}
        growth={growth}
        currency={currency}
        minY={minY}
        maxY={maxY}
        priceDiff={priceDiff}
        width={this.width}
        height={this.height}
        baseLineFactor={this.baseLineFactor}
      />
    );
  }
}

export default Widget;
