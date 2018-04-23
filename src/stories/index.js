import React from 'react';

import { storiesOf } from '@storybook/react';
import DemoAutocomplete from './Autocomplete';
import SingleWidget from './SingleWidget';
import MultipleWidgets from './MultipleWidgets';

storiesOf('JS Ninja React', module)
  .add('Demo Autocomplete', () => <DemoAutocomplete />)
  .add('Demo Single Widget', () => <SingleWidget />)
  .add('Demo Multiple Widgets', () => <MultipleWidgets />);
