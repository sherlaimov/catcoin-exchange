import React from 'react';
import Autocomplete from './Autocomplete';

const data = ['apple', 'avocado', 'banana', 'cucumber', 'eggplant', 'kiwi'];

const withProps = (_data) => (Component) => {
  return class extends React.Component {
    render() {
      return <Component data={_data} />
    }
  }
}

export default withProps(data)(Autocomplete);
// export default Autocomplete;