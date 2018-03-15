import React from 'react';
import './style.css';

export default function PriceWidget(props) {
  const {
    width,
    height,
    dotsArray,
    price,
    growth,
    currency,
    minY,
    maxY,
    priceDiff,
    baseLineFactor,
  } = props;
  const viewBox = `0 0 ${width} ${height}`;
  const priceColor = priceDiff > 0 ? 'red' : 'green';
  const growthColor = growth > 0 ? 'green' : 'red';
  const baseLine = height / baseLineFactor;
  let curPriceCoords = [width + 12, 0];
  let priceRectWidth = 28;
  if (dotsArray.length !== 0) {
    curPriceCoords = dotsArray[dotsArray.length - 2];
    if (curPriceCoords[1] < 12) {
      curPriceCoords[1] = 12;
    }
    priceRectWidth = width / (dotsArray.length - 2) + 5;
  }
  return (
    <div className="price-widget">
      <svg viewBox={viewBox} className="chart">
        <polygon className="chart-polygon" points={dotsArray} />
        {dotsArray.length > 0 &&
          dotsArray.map(
            ([x, y], i) => (i === 1 || i === 0 ? null : <circle key={i} cx={x} cy={y} r="2" />)
          )}
        <text x={priceRectWidth - 5} y="45" className="currency">
          {currency}
        </text>
        <text x={priceRectWidth - 5} y="75" className="price-growth">
          <tspan className={`price ${priceColor}`}>{price}</tspan>
          <tspan className={`growth ${growthColor}`}>{growth ? ` (${growth})` : ''}</tspan>
        </text>
        {dotsArray.map(([x, y], i) => (
          <line className="grid" key={i} x1={x} y1={0} x2={x} y2={300} />
        ))}
        <line className="y-axis" x1={0} y1={0} x2={0} y2={height} />
        <line className="min-tick" x1={0} y1={baseLine} x2={priceRectWidth / 4} y2={baseLine} />
        <line className="max-tick" x1="0" y1="1" x2={priceRectWidth / 4} y2="1" />
        <text className="minY-value" x="1" y={baseLine - 8}>
          {minY}
        </text>
        <text className="minY-value" x="1" y={baseLine - 1}>
          min
        </text>
        <text className="maxY-value" x="1" y="13">
          {maxY}
        </text>
        <text className="maxY-value" x="1" y="6">
          max
        </text>
        <g
          className="current-price-tooltip"
          transform={`translate(${curPriceCoords[0] - priceRectWidth}, ${curPriceCoords[1] - 6})`}
        >
          <rect width={priceRectWidth} height="12" rx="2" ry="2" />
          <text x="1" y="9">
            {price}
          </text>
        </g>
      </svg>
    </div>
  );
}
