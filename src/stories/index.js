import React from 'react';

import { storiesOf } from '@storybook/react';
import DemoAutocomplete from './Autocomplete';
import DemoWidget from './Widget';

storiesOf('JS Ninja React', module)
  .add('Demo Autocomplete', () => <DemoAutocomplete />)
  .add('Demo Widget', () => <DemoWidget />);
