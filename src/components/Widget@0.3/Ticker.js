import React, { Fragment } from 'react';
import { string, number } from 'prop-types';

const Ticker = ({ currency, price, growth, priceDiff }) => {
  const priceColor = priceDiff > 0 ? 'red' : 'green';
  const growthColor = growth > 0 ? 'green' : 'red';

  return (
    <Fragment>
      <text x={23} y="45" className="currency">
        {currency}
      </text>
      <text x={23} y="75" className="priceGrowth">
        <tspan className={`price ${priceColor}`}>{price}</tspan>
        <tspan className={`growth ${growthColor}`}>{` (${growth})`}</tspan>
      </text>
    </Fragment>
  );
};

Ticker.propTypes = {
  currency: string,
  price: number,
  growth: number,
  priceDiff: number
};
export default Ticker;
