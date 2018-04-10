import React from 'react';
import PropTypes from 'prop-types';
import SuggestItems from './SuggestItems';
import './style.css';

const Autocomplete = ({ items, value, onType, onChange, refs }) => (
  <div ref={r => refs.store('$autocompleteRef', r)} className="autocomplete-box">
    <input
      id="autocomplete"
      value={value}
      type="text"
      name="searchVal"
      onChange={onType}
      placeholder="Search your crypto"
    />
    {items.length > 0 && <SuggestItems items={items} onItemClick={onChange} />}
  </div>
);

Autocomplete.defaultProps = {
  value: '',
  items: []
};
Autocomplete.propTypes = {
  value: PropTypes.string,
  items: PropTypes.array,
  onType: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  refs: PropTypes.object.isRequired
};

export default Autocomplete;
