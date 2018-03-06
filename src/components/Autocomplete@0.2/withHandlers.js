import React from 'react';
import getDisplayName from '../../helpers/getDisplayName';
import data from '../../stubs/tickers';

// https://api.coinmarketcap.com/v1/ticker/?limit=10
export default function withHandlers(Component) {
  class WithHandlers extends React.Component {
    state = {
      searchVal: '',
    };

    getItems(_searchVal) {
      // this is undefined here
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

    onItemClick = event => {
      const selectedText = event.target.textContent;
      this.setState(({ searchVal }) => ({ searchVal: selectedText }));
    };

    render() {
      console.log('***** => RENDERING HOC');
      const { searchVal } = this.state;
      console.log({ searchVal });
      return <Component getItems={this.getItems} value={searchVal} onChange={this.onItemClick} />;
    }
  }
  return WithHandlers;
}
