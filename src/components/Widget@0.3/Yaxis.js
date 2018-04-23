import React from 'react';
import { number } from 'prop-types';

const yAxis = ({ baseLine, minY, maxY, height }) => (
  <g>
    <line className="axis" x1={0} y1={0} x2={0} y2={height} />
    <line className="min-tick" x1={0} y1={baseLine} x2={7} y2={baseLine} />
    <line className="max-tick" x1="0" y1="1" x2={7} y2="1" />
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
  </g>
);

yAxis.propTypes = {
  baseLine: number,
  minY: number,
  maxY: number,
  height: number
};

export default yAxis;
