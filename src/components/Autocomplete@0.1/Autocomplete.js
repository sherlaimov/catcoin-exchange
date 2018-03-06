import React, { Fragment } from 'react';
import SuggestItem from './SuggestItem';
import './style.css';

export default class Autocomplete extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     text: '',
  //   };
  //   // this.state = { ...props.initialData };
  // }
  state = {
    searchVal: '',
    searchItems: [],
    found: false,
  };
  // static defaultProps = {
  //   text: '',
  // };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    this.autoSuggest(value);
  };

  autoSuggest(searchVal) {
    const { data } = this.props;
    const searchItems = data.filter(item => item.includes(searchVal) && searchVal !== '');
    const found = searchItems.length > 0;
    this.setState({ searchItems, found });
  }

  inputRef = ref => {
    this.$input = ref;
    console.log(ref);
  };

  onItemClick = event => {
    console.log(event.target.textContent);
    const selectedText = event.target.textContent;
    this.setState(({ searchVal, found }) => ({ searchVal: selectedText, found: false }));
  };

  render() {
    const { searchVal, searchItems, found } = this.state;
    console.log(searchItems);
    return (
      <Fragment>
        <div>
          <input type="text" name="searchVal" value={searchVal} onChange={this.onChange} />
        </div>
        {found && <SuggestItem onItemClick={this.onItemClick} items={searchItems} />}
      </Fragment>
    );
  }
}
