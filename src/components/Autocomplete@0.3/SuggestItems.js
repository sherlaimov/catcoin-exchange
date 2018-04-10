import React from 'react';
import PropTypes from 'prop-types';

export default function SuggestItem({ items, onItemClick }) {
  return (
    <div id="autocomplete-dropdown">
      <ul>
        {items.map(item => (
          <li key={item.id} onClick={onItemClick}>
            {item.symbol}
          </li>
        ))}
      </ul>
    </div>
  );
}

SuggestItem.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired
};
