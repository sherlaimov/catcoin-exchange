import React from 'react';

export default function SuggestItem({ items, onItemClick }) {
  return <div id="autocomplete-dropdown"> {items.map((item) => <p key={item.id} onClick={onItemClick}>{item.symbol}</p>)}</div>;
}
