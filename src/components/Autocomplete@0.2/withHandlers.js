import React from 'react';
import getDisplayName from '../../helpers/getDisplayName';
import data from '../../stubs/tickers';

// https://api.coinmarketcap.com/v1/ticker/?limit=10
export default function withHandlers(Component) {
  class WithHandlers extends React.Component {
    state = {
      searchVal: '',
      items: [],
      found: false,
      set: false,
    };

    getItems(_searchVal) {
      _searchVal = _searchVal.toLowerCase();
      return new Promise((resolve, reject) => {
        const searchItems = data.filter(
          item => item.symbol.toLowerCase().includes(_searchVal) && _searchVal !== ''
        );
        const found = searchItems.length > 0;
        if (found) {
          resolve(searchItems);
        } else {
          console.log('REJECT');
          reject(searchItems);
        }
      });
    }

    onInput = async event => {
      let abort;
      const { name, value } = event.target;
      this.setState({ searchVal: value });
      if (typeof abort === 'function') {
        abort();
      }
      try {
        const newItems = await this.getItems(value);
        if (newItems.abort) {
          abort = newItems.abort;
        }
        if (newItems.length > 0) {
          this.setState(({ items, found, set }) => ({ items: newItems, found: true, set: false }));
        }
      } catch (e) {
        this.setState({ found: false, set: false });
      }
    };

    onClickOutside = () => {
      this.setState({ searchVal: '', found: false });
    };

    onItemClick = event => {
      console.log('===> onItemClick **** fires ****');
      const selectedText = event.target.textContent;
      this.setState(({ searchVal, found, set }) => ({
        searchVal: selectedText,
        found: false,
        set: true,
      }));
    };

    render() {
      console.log('***** => RENDERING HOC');
      const { searchVal, items, found, set } = this.state;
      return (
        <Component
          inputOnBlur={this.inputOnBlur}
          items={items}
          value={searchVal}
          onInput={this.onInput}
          onChange={this.onItemClick}
          items={items}
          found={found}
          set={set}
          onClickOutside={this.onClickOutside}
        />
      );
    }
  }
  return WithHandlers;
}
