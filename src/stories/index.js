import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import DemoAutocomplete from './Autocomplete';
import DemoWidget from './Widget';

storiesOf('JS Ninja React', module)
  .add('Demo Autocomplete', () => <DemoAutocomplete />)
  .add('Demo Widget', () => <DemoWidget />);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
