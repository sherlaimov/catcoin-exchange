import React from 'react';
import { number, array } from 'prop-types';

const PriceTooltip = ({ width, dotsArray, price }) => {
  let curPriceCoords = [width + 12, 0];
  let priceRectWidth;
  if (dotsArray.length !== 0) {
    curPriceCoords = dotsArray[dotsArray.length - 2];
    if (curPriceCoords[1] < 12) {
      curPriceCoords[1] = 12;
    }
    priceRectWidth = width / (dotsArray.length - 2) + 2;
  }
  return (
    <g
      className="current-price-tooltip"
      transform={`translate(${curPriceCoords[0] - priceRectWidth}, ${curPriceCoords[1] - 6})`}
    >
      <rect width={priceRectWidth} height="8" rx="2" ry="2" />
      <text x="4" y="5.5">
        {price}
      </text>
    </g>
  );
};

PriceTooltip.propTypes = {
  width: number,
  dotsArray: array,
  price: number
};

export default PriceTooltip;
