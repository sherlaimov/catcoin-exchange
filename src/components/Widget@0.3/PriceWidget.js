import React from 'react';
import PropTypes from 'prop-types';
import Ticker from './Ticker';
import Yaxis from './Yaxis';
import PriceTooltip from './PriceTooltip';
import './style.css';

class PriceWidget extends React.Component {
  constructor(props) {
    super(props);
    this.height = props.height || 300;
    this.width = props.width || 500;
    this.dots = 30;
    this.rangeY = 0;
    this.rangeX = this.width / this.dots;
    this.firstPrice = null;
    this.priceArray = [];
    this.baseLineFactor = 1.2;
    this.dotsArray = this.initializeDotsArray();
    this.state = {
      growth: null,
      price: null,
      minY: null,
      maxY: null,
      dotsArray: [],
      priceDiff: null
    };
  }

  static propTypes = {
    currency: PropTypes.string.isRequired,
    api: PropTypes.object.isRequired
  };
  initializeDotsArray() {
    const initial = Array.from({ length: this.dots }).map((a, i) => [
      (i + 1) * this.rangeX,
      this.height / this.baseLineFactor
    ]);
    return initial;
  }

  componentDidMount() {
    const { currency, api } = this.props;
    this.api = api;
    this.api.recordCurrency(currency);
    this.api.subscribe(({ currency, price }) => {
      if (currency.toUpperCase() === this.currency) {
        this.calculateWidgetData({ price });
      }
    });
  }

  componentWillUnmount() {
    this.api.cleanUpWSConnections(this.currency);
  }

  calculateWidgetData({ price }) {
    if (price < 0) {
      return;
    }
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
      growth,
      price: parseFloat(price.toFixed(2)),
      minY,
      maxY,
      priceDiff,
      dotsArray: newArr
    });
  }

  render() {
    this.currency = this.props.currency;
    const { dotsArray, price, growth, minY, maxY, priceDiff } = this.state;
    const baseLine = this.height / this.baseLineFactor;
    const viewBox = `0 0 ${this.width} ${this.height}`;
    const isLoading = dotsArray.length > 0;
    if (isLoading)
      return (
        <div className={`price-widget ${this.currency}`}>
          <svg viewBox={viewBox} className="chart">
            <polygon className="chart-polygon" points={dotsArray} />
            {dotsArray.length > 0 &&
              dotsArray.map(
                ([x, y], i) => (i === 1 || i === 0 ? null : <circle key={i} cx={x} cy={y} r="2" />)
              )}
            {dotsArray.map(([x], i) => (
              <line className="grid" key={i} x1={x} y1={0} x2={x} y2={300} />
            ))}
            <Yaxis baseLine={baseLine} minY={minY} maxY={maxY} height={this.height} />
            <Ticker currency={this.currency} price={price} growth={growth} priceDiff={priceDiff} />
            <PriceTooltip width={this.width} dotsArray={dotsArray} price={price} />
          </svg>
        </div>
      );
    return (
      <svg viewBox={viewBox} className="chart loading">
        <text x={this.width / 2} y={this.height / 2}>
          Waiting for Data...
        </text>
      </svg>
    );
  }
}

export default PriceWidget;
