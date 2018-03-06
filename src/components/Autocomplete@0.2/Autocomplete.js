import React, { Fragment, Component } from 'react';
import withHandlers from './withHandlers';
import SuggestItems from './SuggestItems';
import './style.css';

// { value, getItems, onChange }
class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      found: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== '') {
      this.setState({ searchVal: nextProps.value, found: false });
    }
  }
  onInput = async event => {
    const { name, value } = event.target;
    this.setState({ searchVal: value });
    try {
      const newItems = await this.props.getItems(value);
      if (newItems.length > 0) {
        this.setState(({ items, found }) => ({ items: newItems, found: true }));
      }
    } catch (e) {
      this.setState({ found: false });
    }
  };

  render() {
    const { items, found, searchVal } = this.state;
    return (
      <Fragment>
        <input
          id="autocomplete"
          value={searchVal}
          type="text"
          name="searchVal"
          onChange={this.onInput}
        />
        {found && <SuggestItems items={items} onItemClick={this.props.onChange} />}
      </Fragment>
    );
  }
}

export default withHandlers(Autocomplete);
