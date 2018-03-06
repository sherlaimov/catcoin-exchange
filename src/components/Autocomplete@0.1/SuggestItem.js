import React from 'react';

export default function SuggestItem({ items, onItemClick }) {
  return <div id="autocomplete-dropdown"> {items.map((item, i) => <p key={i} onClick={onItemClick}>{item}</p>)}</div>;
}
