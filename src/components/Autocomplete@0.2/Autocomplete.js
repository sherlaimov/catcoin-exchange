import React, { Fragment, Component } from 'react';
import withHandlers from './withHandlers';
import SuggestItems from './SuggestItems';
import './style.css';

class Autocomplete extends Component {
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
    console.log(items, found, value);
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

export default withHandlers(Autocomplete);
