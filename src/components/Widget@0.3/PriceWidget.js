import React from 'react';
import PropTypes from 'prop-types';
import withLoading from '../../hocs/withLoading';
import './style.css';

function PriceWidget({ width, height, dotsArray, ...props }) {
  PriceWidget.resolvedPropertyNames = ['ticker', 'yaxis', 'tooltip'];
  const getComponentChildren = props =>
    React.Children.toArray(props.children).reduce((result, element) => {
      const resolvedElementProperty = Object.keys(element.props).find(prop =>
        PriceWidget.resolvedPropertyNames.includes(prop)
      );
      if (resolvedElementProperty) {
        const elementCollectionName = `${resolvedElementProperty}Children`;
        if (!result[elementCollectionName]) {
          result[elementCollectionName] = [];
        }
        result[elementCollectionName] = [...result[elementCollectionName], element];
      }
      return result;
    }, {});
  const { yaxisChildren, tickerChildren, tooltipChildren } = getComponentChildren(props);
  const viewBox = `0 0 ${width} ${height}`;
  return (
    <div className="price-widget">
      <svg viewBox={viewBox} className="chart">
        <polygon className="chart-polygon" points={dotsArray} />
        {tickerChildren}
        {dotsArray.length > 0 &&
          dotsArray.map(
            ([x, y], i) => (i === 1 || i === 0 ? null : <circle key={i} cx={x} cy={y} r="2" />)
          )}

        {dotsArray.map(([x], i) => <line className="grid" key={i} x1={x} y1={0} x2={x} y2={300} />)}
        {yaxisChildren}
        {tooltipChildren}
      </svg>
    </div>
  );
}

PriceWidget.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  dotsArray: PropTypes.array.isRequired,
};
export default withLoading(PriceWidget);
