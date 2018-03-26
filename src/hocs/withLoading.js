import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '../helpers/getDisplayName';

export default function withLoading(Component) {
  class WithLoading extends React.Component {
    render() {
      const { dotsArray } = this.props;
      const { width, height } = this.props;
      const viewBox = `0 0 ${width} ${height}`;
      const isLoading = dotsArray.length > 0;
      if (isLoading) {
        return <Component {...this.props} />;
      }
      return (
        <svg viewBox={viewBox} className="chart loading">
          <text x={width / 2} y={height / 2}>
            Waiting for Data...
          </text>
        </svg>
      );
    }
  }
  WithLoading.propTypes = {
    dotsArray: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };
  WithLoading.displayName = `WithLoading(${getDisplayName(Component)})`;
  return WithLoading;
}
