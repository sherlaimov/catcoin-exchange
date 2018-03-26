import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SuggestItems from './SuggestItems';
import './style.css';

class Autocomplete extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onInput: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClickOutside: PropTypes.func.isRequired
  };
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  autocompleteRef = ref => {
    this.$autocompleteRef = ref;
  };

  handleClickOutside = event => {
    if (this.$autocompleteRef.contains(event.target) || this.props.set) {
      return;
    }
    this.props.onClickOutside();
  };

  render() {
    const { items, found, value } = this.props;
    return (
      <div ref={this.autocompleteRef} className="autocomplete-box">
        <input
          id="autocomplete"
          value={value}
          type="text"
          name="searchVal"
          onChange={this.props.onInput}
          placeholder="Search your crypto"
        />
        {found && <SuggestItems items={items} onItemClick={this.props.onChange} />}
      </div>
    );
  }
}

export default Autocomplete;
