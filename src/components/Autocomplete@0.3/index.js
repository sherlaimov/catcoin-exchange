import React from 'react';
import { withProps, compose, withState, lifecycle, withHandlers, renameProp } from 'recompose';

import Autocomplete from './Autocomplete';
import tickers from '../../stubs/tickers';

class RefsStore {
  store(name, value) {
    this[name] = value;
  }
}

const withRefs = compose(
  withProps({ refs: new RefsStore() }),
  withHandlers({
    handleClickOutside: props => event => {
      if (props.refs.$autocompleteRef.contains(event.target) || props.selectedItem) {
        return;
      }
      props.setSearchVal('');
      props.setFoundItems([]);
    }
  }),
  lifecycle({
    componentDidMount() {
      document.addEventListener('mousedown', this.props.handleClickOutside);
    },
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.props.handleClickOutside);
    }
  })
);

const withInputHandlers = compose(
  withProps({ data: tickers }),
  withState('value', 'setSearchVal', ''),
  withState('items', 'setFoundItems', []),
  withState('selectedItem', 'setSelectedItem', false),
  withHandlers({
    getItems: ({ data }) => value => {
      const searchVal = value.toLowerCase();
      return new Promise((resolve, reject) => {
        const searchItems = data.filter(
          item => item.symbol.toLowerCase().includes(searchVal) && searchVal !== ''
        );
        const found = searchItems.length > 0;
        if (found) {
          resolve(searchItems);
        } else {
          console.log('REJECT');
          reject(searchItems);
        }
      });
    },
    onType: ({ setSearchVal, setSelectedItem }) => event => {
      setSelectedItem(false);
      const { name, value } = event.target;
      setSearchVal(value);
    },
    onItemClick: ({ setSearchVal, setFoundItems, setSelectedItem }) => event => {
      const selectedText = event.target.textContent;
      setSearchVal(selectedText);
      setFoundItems([]);
      setSelectedItem(true);
    }
  }),
  renameProp('onItemClick', 'onChange'),

  lifecycle({
    componentDidUpdate(prevProps, prevState) {
      const { value, getItems, setFoundItems, selectedItem } = this.props;
      if (prevProps.value !== value && selectedItem !== true) {
        getItems(value)
          .then(items => setFoundItems(items))
          .catch(e => setFoundItems([]));
      }
    }
  })
);
export default compose(withInputHandlers, withRefs)(Autocomplete);
