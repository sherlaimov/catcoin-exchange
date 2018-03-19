import React from 'react';
import PropTypes from 'prop-types';

export default function SuggestItem({ items, onItemClick }) {
  return (
    <div id="autocomplete-dropdown">
      {items.map(item => (
        <p key={item.id} onClick={onItemClick}>
          {item.symbol}
        </p>
      ))}
    </div>
  );
}

SuggestItem.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired
};
